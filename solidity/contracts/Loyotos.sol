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

    event EnvelopeCreated(uint _id, address owner);
    event EnvelopeWithdrawn(uint _id, address owner);
    event FundsDeposited(
        uint _id,
        address _depositor,
        uint _amount,
        uint _totalAmount
    );

    error NotEnvelopeOwner();
    error Locked(uint _lockEnd);
    error AlreadyWithdrawn();

    constructor() {}

    function createEnvelope(uint64 _lockEnd) external {
        Envelope memory newEnvelope = Envelope(
            0,
            payable(msg.sender),
            _lockEnd,
            false
        );
        envelopes[envelopesCount] = newEnvelope;
        emit EnvelopeCreated(envelopesCount, msg.sender);
        ++envelopesCount;
    }

    function sendEthToEnvelope(uint _id) external payable {
        Envelope storage envelope = envelopes[_id];
        if (envelope.isWithdrawn) revert AlreadyWithdrawn();
        envelope.weiAmount += msg.value;
        emit FundsDeposited(_id, msg.sender, msg.value, envelope.weiAmount);
    }

    function withdraw(uint _id) external {
        Envelope storage envelope = envelopes[_id];
        if (envelope.owner != msg.sender) revert NotEnvelopeOwner();
        if (envelope.lockEnd > block.timestamp) {
            revert Locked({_lockEnd: envelope.lockEnd});
        }
        if (envelope.isWithdrawn) revert AlreadyWithdrawn();
        envelope.isWithdrawn = true;
        envelope.owner.transfer(envelope.weiAmount);
        envelope.weiAmount = 0;
        emit EnvelopeWithdrawn(_id, envelope.owner);
    }
}
