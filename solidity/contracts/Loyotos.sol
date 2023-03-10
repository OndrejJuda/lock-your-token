// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "hardhat/console.sol";

contract Loyotos {
    struct Envelope {
        uint256 weiAmount;
        address payable owner;
        uint64 lockEnd;
        bool isWithdrawn;
    }

    uint public envelopesCount = 0;
    mapping(uint => Envelope) public envelopes;

    event EnvelopeCreated();
    event EnvelopeWithdrawn();
    event FundsDeposited();

    error NotEnvelopeOwner();
    error Locked();
    error AlreadyWithdrawn();

    modifier onlyEnvelopeOwner(address _owner, uint _id) {
        if (_owner != envelopes[_id].owner) revert NotEnvelopeOwner();
        _;
    }

    constructor() {}

    function createEnvelope(uint64 _lockEnd) external {
        Envelope memory newEnvelope = Envelope(0, payable(msg.sender), _lockEnd, false);
        envelopes[envelopesCount] = newEnvelope;
        ++envelopesCount;
    }

    function sendEthToEnvelope(uint _id) external payable {
        Envelope storage envelope = envelopes[_id];
        if (envelope.isWithdrawn) revert AlreadyWithdrawn();
        envelope.weiAmount += msg.value;
    }

    function withdraw(uint _id) external onlyEnvelopeOwner(msg.sender, _id) {}
}
