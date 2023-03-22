// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "../node_modules/hardhat/console.sol";

contract Loyotos {
    struct Envelope {
        uint256 id;
        uint256 weiAmount;
        uint64 lockEnd;
        address payable owner;
        bool isWithdrawn;
        string title;
    }

    uint public envelopesCount = 0;
    mapping(uint => Envelope) public envelopes;
    mapping(address => uint) public envelopesCountByOwner;

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

    function createEnvelope(uint64 _lockEnd, string calldata _title) external {
        Envelope memory newEnvelope = Envelope(
            envelopesCount,
            0,
            _lockEnd,
            payable(msg.sender),
            false,
            _title
        );
        envelopes[envelopesCount] = newEnvelope;
        ++envelopesCount;
        envelopesCountByOwner[msg.sender]++;
        emit EnvelopeCreated(envelopesCount, msg.sender);
    }

    function getEnvelopesByOwner(
        address _owner
    ) external view returns (Envelope[] memory ownerEnvelopes) {
        uint totalCount = envelopesCount;
        uint ownerCount = envelopesCountByOwner[_owner];
        uint counter = 0;
        Envelope[] memory _ownerEnvelopes = new Envelope[](ownerCount);

        for (uint i; i < totalCount; i++) {
            Envelope memory currentEnvelope = envelopes[i];
            if (envelopes[i].owner == _owner) {
                _ownerEnvelopes[counter] = currentEnvelope;
                ++counter;
            }
        }
        return _ownerEnvelopes;
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
