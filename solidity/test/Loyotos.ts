import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Loyotos } from '../typechain-types';
import { ContractTransaction } from '@ethersproject/contracts';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const sleep = (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

describe('Loyotos', () => {
  let loyotosContract: Loyotos,
    owner: SignerWithAddress,
    secondAccount: SignerWithAddress,
    transaction: ContractTransaction;

  const waitSeconds = 20;
  const lockEnd = new Date().setSeconds(new Date().getSeconds() + waitSeconds);
  const lockEndSeconds = +(lockEnd / 1000).toFixed(0);

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
    const envelopeId = 0;

    beforeEach(async () => {
      [owner, secondAccount] = await ethers.getSigners();

      const Loyotos = await ethers.getContractFactory('Loyotos');
      loyotosContract = await Loyotos.deploy();

      transaction = await loyotosContract.connect(owner).createEnvelope(lockEndSeconds);
      await transaction.wait();
    });

    it('creates new envelope', async () => {
      expect(await loyotosContract.envelopesCount()).to.be.equal(envelopeId + 1);
    });
    it('has correct owner', async () => {
      expect((await loyotosContract.envelopes(envelopeId)).owner).to.be.equal(owner.address);
    });
    it('has correct lock end', async () => {
      expect((await loyotosContract.envelopes(envelopeId)).lockEnd).to.be.equal(lockEndSeconds);
    });
  });

  describe('Pay Envelope', () => {
    const envelopeId = 0;
    const amountEth = 1;
    const amountWei = ethers.utils.parseEther(amountEth.toString());

    beforeEach(async () => {
      [owner, secondAccount] = await ethers.getSigners();

      const Loyotos = await ethers.getContractFactory('Loyotos');
      loyotosContract = await Loyotos.deploy();

      transaction = await loyotosContract.connect(owner).createEnvelope(lockEndSeconds);
      await transaction.wait();
    });

    it('has zero value', async () => {
      expect((await loyotosContract.envelopes(envelopeId)).weiAmount).to.equal(0);
    });
    it(`has ${amountEth} eth`, async () => {
      transaction = await loyotosContract.sendEthToEnvelope(envelopeId, { value: amountWei });
      await transaction.wait();
      expect((await loyotosContract.envelopes(envelopeId)).weiAmount).to.equal(amountWei);
    });
  });

  describe('Withdraw Envelope', () => {
    const envelopeId = 0;
    const amountEth = 1;
    const amountWei = ethers.utils.parseEther(amountEth.toString());

    beforeEach(async () => {
      [owner, secondAccount] = await ethers.getSigners();

      const Loyotos = await ethers.getContractFactory('Loyotos');
      loyotosContract = await Loyotos.deploy();

      transaction = await loyotosContract.connect(owner).createEnvelope(lockEndSeconds);
      await transaction.wait();

      transaction = await loyotosContract.sendEthToEnvelope(envelopeId, { value: amountWei });
      await transaction.wait();
    });

    it('reverts locked', async () => {
      await expect(loyotosContract.connect(owner).withdraw(envelopeId)).to.be.reverted;
    });
    it('reverts non-owner', async () => {
      await expect(loyotosContract.connect(secondAccount).withdraw(envelopeId)).to.be.reverted;
    });
    it('withdraws', async () => {
      const amountBefore = await owner.getBalance();

      await sleep(waitSeconds + 10);
      transaction = await loyotosContract.connect(owner).withdraw(envelopeId);
      await transaction.wait();

      const amountAfter = await owner.getBalance();

      expect((await loyotosContract.envelopes(envelopeId)).isWithdrawn).to.equal(true);
      expect((await loyotosContract.envelopes(envelopeId)).weiAmount).to.equal(0);
      expect(amountAfter).to.be.greaterThan(amountBefore);
    });
    it('reverts withdrawn', async () => {
      transaction = await loyotosContract.connect(owner).withdraw(envelopeId);
      await transaction.wait();

      await expect(loyotosContract.connect(owner).withdraw(envelopeId)).to.be.reverted;
      await expect(loyotosContract.connect(owner).sendEthToEnvelope(envelopeId, { value: amountWei })).to.be.reverted;
    });
  });
});
