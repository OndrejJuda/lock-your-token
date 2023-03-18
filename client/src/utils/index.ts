import { IEnvelope } from "@/interfaces";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from "ethers";
import { abi as loyotosABI } from '../../../solidity/artifacts/contracts/Loyotos.sol/Loyotos.json';
import { ContractContext } from '../../../solidity/types/ILoyotos';

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_LOYOTOS_CONTRACT_ADDRESS;
const getProvider = (ethereum: ethers.providers.ExternalProvider) => new ethers.providers.Web3Provider(ethereum);
const getContract = (provider: ethers.providers.Web3Provider) => {
  if (!provider || !CONTRACT_ADDRESS || !loyotosABI) return;
  return new ethers.Contract(
    CONTRACT_ADDRESS,
    loyotosABI,
    provider
  ) as unknown as ContractContext;
};
export const getWeb3 = (ethereum: ethers.providers.ExternalProvider) => {
  const provider = getProvider(ethereum);
  const contract = getContract(provider);
  return { provider, contract };
};

export const getEnvelopes = async (ethereum: MetaMaskInpageProvider): Promise<IEnvelope[]> => {
  const externalProvider = ethereum as unknown as ethers.providers.ExternalProvider;
  const { provider, contract } = getWeb3(externalProvider);
  const signer = provider.getSigner();
  const count = await contract?.connect(signer).envelopesCount();
  const envelope = await contract?.connect(signer).envelopes(0);
  console.log('count:', count?.toNumber());
  console.log('envelope:', envelope);


  return [];
};