import { IEnvelope } from "@/interfaces";
import { setAddress } from "@/store/userSlice";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from "ethers";
// This is generated elswhere, don't forget to update it when changing contract
import loyotosJSON from '../../contractTypes/Loyotos.json';
import { ContractContext } from '../../contractTypes/ILoyotos';

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const IS_LOCAL = process.env.NEXT_PUBLIC_IS_LOCAL === 'true';
export const CONTRACT_ADDRESS = IS_LOCAL
  ? process.env.NEXT_PUBLIC_LOYOTOS_CONTRACT_ADDRESS_LOCAL
  : process.env.NEXT_PUBLIC_LOYOTOS_CONTRACT_ADDRESS;
const loyotosABI = loyotosJSON.abi;

const getProvider = (ethereum: ethers.providers.ExternalProvider) => new ethers.providers.Web3Provider(ethereum);
const getContract = (provider: ethers.providers.Web3Provider) => {
  if (!provider || !CONTRACT_ADDRESS || !loyotosABI) return;
  return new ethers.Contract(
    CONTRACT_ADDRESS,
    loyotosABI,
    provider
  ) as unknown as ContractContext;
};
export const getWeb3 = (ethereum: MetaMaskInpageProvider) => {
  const externalProvider = ethereum as unknown as ethers.providers.ExternalProvider;
  const provider = getProvider(externalProvider);
  const contract = getContract(provider);
  return { provider, contract };
};

export const getEnvelopes = async (ethereum: MetaMaskInpageProvider, address: string): Promise<IEnvelope[]> => {
  const { provider, contract } = getWeb3(ethereum);
  const signer = provider.getSigner();
  if (!contract) return [];
  const envelopes = await contract.connect(signer).getEnvelopesByOwner(address);
  return envelopes?.map(({ isWithdrawn, lockEnd, title, weiAmount, id }, index): IEnvelope => ({
    amount: +ethers.utils.formatEther(weiAmount),
    id: id.toString(),
    lockEnd: new Date(+lockEnd.toString() * 1000),
    title,
    isWithdrawn,
  }));
};

export const createEnvelope = async (ethereum: MetaMaskInpageProvider, lockEnd: number, title: string): Promise<boolean> => {
  try {
    const { provider, contract } = getWeb3(ethereum);
    const signer = provider.getSigner();
    if (!contract) return false;
    const transaction = await contract.connect(signer).createEnvelope(lockEnd, title);
    await transaction.wait();
    return true;
  } catch (error) {
    return false;
  }
}

const chainHandler = async (ethereum: MetaMaskInpageProvider) => {
  const currentChainId = await ethereum.request({ method: 'eth_chainId' }) as string;
  let desiredChainId: string;
  if (IS_LOCAL) {
    desiredChainId = composeChainId(process.env.NEXT_PUBLIC_HARDHAT_CHAIN_ID ?? '');
  } else {
    desiredChainId = composeChainId(process.env.NEXT_PUBLIC_GOERLI_CHAIN_ID ?? '');
  }
  if (desiredChainId !== currentChainId) {
    try {
      await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: desiredChainId }] });
    } catch (error: any) {
      console.log(error);
      if (error.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: desiredChainId,
              chainName: 'Hardhat Local',
              nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['http://127.0.0.1:8545'],
              blockExplorerUrls: null,
              iconUrls: null,
            }],
          });
        } catch (error) {
        }
      }
    }
  }
};

// TODO: fix dispatch type
export const connectHandler = async (ethereum: MetaMaskInpageProvider, dispatch: any) => {
  try {
    await chainHandler(ethereum);
    await ethereum?.request({ method: 'eth_requestAccounts' });
    const accounts = await ethereum?.request({ method: 'eth_accounts' });
    let account: string | undefined;
    if (typeof accounts === 'string') {
      account = accounts;
    } else if (Array.isArray(accounts) && accounts.length > 0) {
      account = accounts[0];
    }

    if (account) {
      dispatch(setAddress(account));
    } else {

    }
  } catch (error) {

  }
}

export const depositToEnvelope = async (ethereum: MetaMaskInpageProvider, id: string, amount: number): Promise<boolean> => {
  try {
    const { provider, contract } = getWeb3(ethereum);
    const signer = provider.getSigner();
    if (!contract) return false;
    const weiAmount = ethers.utils.parseEther(amount.toString());
    const transaction = await contract.connect(signer).sendEthToEnvelope(id, { value: weiAmount });
    await transaction.wait();
    return true;
  } catch (error) {
    return false;
  }
};

export const withdraw = async (ethereum: MetaMaskInpageProvider, id: string): Promise<boolean> => {
  try {
    const { provider, contract } = getWeb3(ethereum);
    const signer = provider.getSigner();
    if (!contract) return false;
    const transaction = await contract.connect(signer).withdraw(id);
    await transaction.wait();
    return true;
  } catch (error) {
    return false;
  }
}

export const composeChainId = (id: string) => `0x${id}`;
