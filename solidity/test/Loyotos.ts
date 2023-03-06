import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Loyotos } from '../typechain-types';
import { ContractTransaction } from '@ethersproject/contracts';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

describe('Loyotos', () => {
  let loyotosContract: Loyotos,
    owner: SignerWithAddress,
    secondAccount: SignerWithAddress,
    transaction: ContractTransaction;

  const now = new Date();
  const lockEnd = now.setHours(now.getHours() + 1);

  describe('Deployment', () => {
    beforeEach(async () => {
      [owner, secondAccount] = await ethers.getSigners();

      const Loyotos = await ethers.getContractFactory('Loyotos');
      loyotosContract = await Loyotos.deploy();
    });

    it('deploys', async () => {
      expect(loyotosContract.address).to.not.equal(ZERO_ADDRESS);
    });
    it('has zero envelopes', async () => {
      expect(await loyotosContract.envelopesCount()).to.be.equal(0);
    });
  });

  describe('Create Envelope', () => {
    beforeEach(async () => {
      [owner, secondAccount] = await ethers.getSigners();

      const Loyotos = await ethers.getContractFactory('Loyotos');
      loyotosContract = await Loyotos.deploy();

      transaction = await loyotosContract.connect(owner).createEnvelope(lockEnd);
      await transaction.wait();
    })

    it('creates new envelope', async () => {
      expect(await loyotosContract.envelopesCount()).to.be.equal(1);
    });
    it('has correct owner', async () => {
      expect((await loyotosContract.envelopes(0)).owner).to.be.equal(owner.address);
    });
    it('has correct lock end', async () => {
      expect((await loyotosContract.envelopes(0)).lockEnd).to.be.equal(lockEnd);
    });
  });
});
