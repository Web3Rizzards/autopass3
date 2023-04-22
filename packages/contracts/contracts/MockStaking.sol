pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IRewardToken.sol";

contract MockStaking is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    IERC20 public rewardToken;
    uint256 public rewardsPerBlock;

    struct Staker {
        uint256 stakedAmount;
        uint256 rewardDebt;
    }

    mapping(address => Staker) public stakers;

    uint256 public totalStaked;
    uint256 public lastRewardBlock;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event Claim(address indexed user, uint256 amount);

    constructor(IERC20 _rewardToken, uint256 _rewardsPerBlock) {
        rewardToken = _rewardToken;
        rewardsPerBlock = _rewardsPerBlock;
        lastRewardBlock = block.number;
    }

    function pendingRewards(address _user) public view returns (uint256) {
        Staker storage staker = stakers[_user];
        uint256 stakedAmount = staker.stakedAmount;

        if (block.number <= lastRewardBlock || stakedAmount == 0) {
            return 0;
        }

        uint256 multiplier = block.number - lastRewardBlock;
        uint256 totalRewards = multiplier * rewardsPerBlock;
        uint256 userRewards = (totalRewards * stakedAmount) / totalStaked;
        return userRewards - staker.rewardDebt;
    }

    function deposit() public payable nonReentrant {
        require(msg.value > 0, "No ETH sent to deposit");

        updatePool();

        Staker storage staker = stakers[msg.sender];
        if (staker.stakedAmount > 0) {
            uint256 pending = pendingRewards(msg.sender);
            if (pending > 0) {
                rewardToken.safeTransfer(msg.sender, pending);
            }
        }

        staker.stakedAmount += msg.value;
        staker.rewardDebt = (staker.stakedAmount * totalStaked) / totalStaked;
        totalStaked += msg.value;

        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 _amount) public nonReentrant {
        Staker storage staker = stakers[msg.sender];
        require(staker.stakedAmount >= _amount, "Insufficient staked amount");

        updatePool();

        uint256 pending = pendingRewards(msg.sender);
        if (pending > 0) {
            rewardToken.safeTransfer(msg.sender, pending);
        }

        if (_amount > 0) {
            staker.stakedAmount -= _amount;
            payable(msg.sender).transfer(_amount);
        }

        staker.rewardDebt = (staker.stakedAmount * totalStaked) / totalStaked;
        totalStaked -= _amount;

        emit Withdraw(msg.sender, _amount);
    }

    function claim() public nonReentrant {
        Staker storage staker = stakers[msg.sender];
        require(staker.stakedAmount > 0, "No staked amount");

        updatePool();
        uint256 pending = pendingRewards(msg.sender);
        if (pending > 0) {
            staker.rewardDebt = (staker.stakedAmount * totalStaked) / totalStaked;
            rewardToken.safeTransfer(msg.sender, pending);
            emit Claim(msg.sender, pending);
        }
    }

    function updatePool() internal {
        if (block.number <= lastRewardBlock) {
            return;
        }

        if (totalStaked == 0) {
            lastRewardBlock = block.number;
            return;
        }

        uint256 multiplier = block.number - lastRewardBlock;
        uint256 totalRewards = multiplier * rewardsPerBlock;
        lastRewardBlock = block.number;

        // If the reward token is mintable, you can mint rewards here
        IRewardToken(address(rewardToken)).mint(address(this), totalRewards);
    }

    // Owner functions for emergencies

    function setRewardsPerBlock(uint256 _rewardsPerBlock) external onlyOwner {
        updatePool();
        rewardsPerBlock = _rewardsPerBlock;
    }

    function emergencyWithdrawRewardTokens(uint256 _amount) external onlyOwner {
        rewardToken.safeTransfer(owner(), _amount);
    }

    function emergencyWithdrawETH(uint256 _amount) external onlyOwner {
        payable(owner()).transfer(_amount);
    }
}
