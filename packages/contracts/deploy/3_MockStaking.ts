import 'dotenv/config';

import { ethers } from 'hardhat';

module.exports = async ({ getNamedAccounts, deployments, getChainId }: any) => {
  const { deploy, read, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  // Get current block
  const block = await ethers.provider.getBlock('latest');
  // Get current block number
  const blockNumber = block.number;

  let rewardToken = await deploy('RewardToken', {
    from: deployer,
    log: true,
    args: [],
  });
  let contract = await deploy('MockStaking', {
    from: deployer,
    log: true,
    args: [rewardToken.address, ethers.utils.parseEther('10'), block.number, blockNumber + 10000],
  });

  // // Mint 250 million tokens to MockStaking contract
  await execute(
    'RewardToken',
    { from: deployer, log: true },

    'mint',
    contract.address,
    ethers.utils.parseEther('250000000')
  );
};

module.exports.tags = ['MockStaking'];
