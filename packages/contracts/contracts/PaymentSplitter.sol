pragma solidity ^0.8.0;

contract PaymentSplitter {
    // The `pay` function now only accepts Ether (ETH)
    function pay(address[] calldata recipients, uint256[] calldata amounts) external payable {
        // Ensure that the recipients and amounts arrays have the same length
        require(recipients.length == amounts.length, "Invalid input: mismatched arrays");

        // Calculate the total amount to be transferred
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }

        // Ensure that the user has sent enough Ether to cover the total amount
        require(msg.value >= totalAmount, "Insufficient sent value");

        // Transfer the specified amounts of Ether to the recipients
        for (uint256 i = 0; i < recipients.length; i++) {
            (bool success, ) = recipients[i].call{ value: amounts[i] }("");
            require(success, "Transfer failed");
        }

        // If the user sent more Ether than the total amount, refund the difference
        uint256 refundAmount = msg.value - totalAmount;
        if (refundAmount > 0) {
            (bool success, ) = msg.sender.call{ value: refundAmount }("");
            require(success, "Refund failed");
        }
    }
}
