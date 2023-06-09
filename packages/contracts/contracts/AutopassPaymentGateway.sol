// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

contract AutopassPaymentGateway {
    // Increment every time a payment is received
    uint256 public paymentId = 0;
    address public owner;

    event PaymentReceived(address indexed sender, uint256 amount, string orderId, uint256 paymentId, bytes data);

    constructor(address _safe) {
        owner = _safe;
    }

    // Set owner
    function setOwner(address _safe) public {
        owner = _safe;
    }

    /**
     * Create a payment
     * @param orderId Order ID
     * @param data Data
     */
    function createPayment(string memory orderId, bytes memory data) public payable {
        paymentId++;
        // Transfer to owner wallet
        payable(owner).transfer(msg.value);
        emit PaymentReceived(msg.sender, msg.value, orderId, paymentId, data);
    }
}
