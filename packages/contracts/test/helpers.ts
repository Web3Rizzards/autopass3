import { ethers } from 'hardhat';

export async function advanceBlockTo(target: number): Promise<void> {
  const currentBlock = (await ethers.provider.getBlockNumber()) + 1;
  for (let i = currentBlock; i < target; i++) {
    await ethers.provider.send('evm_mine', []);
  }
}
