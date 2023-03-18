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
  
  const envelopeId = 0;
  const amountEth = 1;
  const amountWei = ethers.utils.parseEther(amountEth.toString());
  const title = 'Retirement';

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

      transaction = await loyotosContract.connect(owner).createEnvelope(lockEndSeconds, title);
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
    it('has correct title', async () => {
      expect((await loyotosContract.envelopes(envelopeId)).title).to.be.equal(title);
    });
    it('increased envelopes count by owner', async () => {
      expect(await loyotosContract.envelopesCountByOwner(owner.address)).to.be.equal(1);
    });
    it('returns owner envelopes', async () => {
      const envelopes = await loyotosContract.getEnvelopesByOwner(owner.address);
      expect(envelopes.length).to.be.equal(1);
      expect(envelopes[0].owner).to.be.equal(owner.address);
    })
  });

  describe('Pay Envelope', () => {
    beforeEach(async () => {
      [owner, secondAccount] = await ethers.getSigners();

      const Loyotos = await ethers.getContractFactory('Loyotos');
      loyotosContract = await Loyotos.deploy();

      transaction = await loyotosContract.connect(owner).createEnvelope(lockEndSeconds, title);
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
    beforeEach(async () => {
      [owner, secondAccount] = await ethers.getSigners();

      const Loyotos = await ethers.getContractFactory('Loyotos');
      loyotosContract = await Loyotos.deploy();

      transaction = await loyotosContract.connect(owner).createEnvelope(lockEndSeconds, title);
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
