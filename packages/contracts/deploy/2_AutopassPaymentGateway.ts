import 'dotenv/config';

import { ethers } from 'hardhat';

module.exports = async ({ getNamedAccounts, deployments, getChainId }: any) => {
  const { deploy, read, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  let safe = '0x50865b07e1635066Aa2278b318B4547C9E721000';
  let contract = await deploy('AutopassPaymentGateway', {
    from: deployer,
    log: true,
    args: [safe],
  });
};

module.exports.tags = ['Autopass'];
