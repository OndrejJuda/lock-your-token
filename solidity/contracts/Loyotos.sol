// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "hardhat/console.sol";

contract Loyotos {
    struct Envelope {
      uint256 ethAmount;
      address owner;
      uint64 lockEnd;
    }

    uint public envelopesCount = 0;
    mapping(uint => Envelope) public envelopes;

    event EnvelopeCreated();
    event EnvelopeUnlocked();
    event FundsDeposited();

    error NotEnvelopeOwner();
    error Locked();

    modifier onlyEnvelopeOwner(address _owner, uint _id) {
      if (_owner != envelopes[_id].owner) revert NotEnvelopeOwner();
      _;
    }

    constructor() {}

    function createEnvelope(uint64 _lockEnd) external {
      Envelope memory newEnvelope = Envelope(0, msg.sender, _lockEnd);
      envelopes[envelopesCount] = newEnvelope;
      ++envelopesCount;
    }
}
