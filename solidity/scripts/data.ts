import { ethers } from "hardhat";

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

async function main() {
  const [owner] = await ethers.getSigners();
  const contract =  await ethers.getContractAt('Loyotos', CONTRACT_ADDRESS);

  
  const waitSeconds = 20;
  const lockEnd = new Date().setSeconds(new Date().getSeconds() + waitSeconds);
  const lockEndSeconds = +(lockEnd / 1000).toFixed(0);

  const envelopeId = 0;
  const amountEth = 1.255587455;
  const amountWei = ethers.utils.parseEther(amountEth.toString());
  const title = 'Retirement';

  let transaction = await contract.connect(owner).createEnvelope(lockEndSeconds, title);
  await transaction.wait();
  
  transaction = await contract.sendEthToEnvelope(envelopeId, { value: amountWei });
  await transaction.wait();

  console.log('done');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
