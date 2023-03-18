import { ethers } from "hardhat";

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

async function main() {
  const [owner] = await ethers.getSigners();
  const contract =  await ethers.getContractAt('Loyotos', CONTRACT_ADDRESS);

  
  const waitSeconds = 20;
  const lockEnd = new Date().setSeconds(new Date().getSeconds() + waitSeconds);
  const lockEndSeconds = +(lockEnd / 1000).toFixed(0);

  let transaction = await contract.connect(owner).createEnvelope(lockEndSeconds);
  await transaction.wait();

  console.log('done');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
