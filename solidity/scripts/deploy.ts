import { ethers } from "hardhat";

async function main() {
  const Loyotos = await ethers.getContractFactory('Loyotos');
  const loyotosContract = await Loyotos.deploy();

  console.log('Deployed to address:', loyotosContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
