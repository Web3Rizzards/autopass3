// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

interface IRewardToken {
    function mint(address _to, uint256 _amount) external;
}
