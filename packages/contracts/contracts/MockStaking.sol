// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockStaking {
    using SafeERC20 for IERC20;

    // Info of each user.
    struct UserInfo {
        uint256 amount; // How many rewardToken tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
    }

    // Info of Pool
    struct PoolInfo {
        uint256 lastRewardBlock; // Last block number that Rewards distribution occurs.
        uint256 accRewardPerShare; // Accumulated reward per share, times 1e12. See below.
    }

    // The rewardToken TOKEN!
    IERC20 public rewardToken;
    // rewards created per block.
    uint256 public rewardPerBlock;

    uint256 public totalrewardToken;
    // Info.
    PoolInfo public poolInfo;
    // Info of each user that stakes rewardToken tokens.
    mapping(address => UserInfo) public userInfo;

    // The block number when mining starts.
    uint256 public startBlock;
    // The block number when mining ends.
    uint256 public bonusEndBlock;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 amount);
    event PoolUpdate(uint256 accRewardPerShare, uint256 lastRewardBlock);

    constructor(address _rewardToken, uint256 _rewardPerBlock, uint256 _startBlock, uint256 _endBlock) {
        rewardToken = IERC20(_rewardToken);
        rewardPerBlock = _rewardPerBlock;
        startBlock = _startBlock;
        bonusEndBlock = _endBlock;

        // staking pool
        poolInfo = PoolInfo({ lastRewardBlock: startBlock, accRewardPerShare: 0 });
    }

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to) internal view returns (uint256) {
        if (_to <= bonusEndBlock) {
            return _to - _from;
        } else if (_from >= bonusEndBlock) {
            return 0;
        } else {
            return bonusEndBlock - _from;
        }
    }

    // View function to see pending Tokens on frontend.
    function pendingReward(address _user) external view returns (uint256) {
        PoolInfo storage pool = poolInfo;
        UserInfo storage user = userInfo[_user];
        uint256 accRewardPerShare = pool.accRewardPerShare;
        uint256 stakedSupply = totalrewardToken;
        if (block.number > pool.lastRewardBlock && stakedSupply != 0) {
            uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            uint256 tokenReward = multiplier * rewardPerBlock;
            accRewardPerShare = accRewardPerShare + ((tokenReward * 1e12) / stakedSupply);
        }
        return (user.amount * accRewardPerShare) / 1e12 - user.rewardDebt;
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool() public {
        if (block.number <= poolInfo.lastRewardBlock) {
            return;
        }
        uint256 lpSupply = totalrewardToken;
        if (lpSupply == 0) {
            poolInfo.lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(poolInfo.lastRewardBlock, block.number);
        uint256 tokenReward = multiplier * rewardPerBlock;
        poolInfo.accRewardPerShare = poolInfo.accRewardPerShare + ((tokenReward * 1e12) / lpSupply);
        poolInfo.lastRewardBlock = block.number;

        emit PoolUpdate(poolInfo.accRewardPerShare, poolInfo.lastRewardBlock);
    }

    // Deposit rewardToken tokens to Farm for reward allocation.
    function deposit() public payable {
        UserInfo storage user = userInfo[msg.sender];
        updatePool();
        if (user.amount > 0) {
            uint256 pending = ((user.amount * poolInfo.accRewardPerShare) / 1e12) - user.rewardDebt;
            rewardToken.safeTransfer(msg.sender, pending);
        }
        user.amount = user.amount + msg.value;
        user.rewardDebt = (user.amount * poolInfo.accRewardPerShare) / 1e12;
        totalrewardToken += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // Withdraw rewardToken tokens from Farm.
    function withdraw(uint256 _amount) public {
        UserInfo storage user = userInfo[msg.sender];
        require(user.amount >= _amount, "withdraw: not good");
        updatePool();
        uint256 pending = ((user.amount * poolInfo.accRewardPerShare) / 1e12) - user.rewardDebt;
        rewardToken.safeTransfer(msg.sender, pending);
        user.amount = user.amount - _amount;
        user.rewardDebt = (user.amount * poolInfo.accRewardPerShare) / 1e12;
        payable(msg.sender).transfer(_amount);
        totalrewardToken -= _amount;
        emit Withdraw(msg.sender, _amount);
    }
}
