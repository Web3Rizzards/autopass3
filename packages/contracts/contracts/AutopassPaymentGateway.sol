// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

contract AutopassPaymentGateway {
    // Increment every time a payment is received
    uint256 public paymentId = 0;
    address public owner;

    event PaymentReceived(address indexed sender, uint256 amount, string orderId, uint256 paymentId, bytes data);

    constructor() {
        owner = msg.sender;
    }

    /**
     * Create a payment
     * @param orderId Order ID
     * @param data Data
     */
    function createPayment(string memory orderId, bytes memory data) public payable {
        paymentId++;
        emit PaymentReceived(msg.sender, msg.value, orderId, paymentId, data);
    }

    /**
     * Withdraw funds from the contract
     * @param _to Recipient of the funds
     */
    function withdrawFunds(address payable _to) public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        _to.transfer(address(this).balance);
    }
}
