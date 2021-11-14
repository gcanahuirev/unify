/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { ethers } from 'hardhat';

describe('NFT', async () => {
  let marketAddress: string;

  beforeEach(async () => {
    const Market = await ethers.getContractFactory('NFTMarket');
    const market = await Market.deploy();
    await market.deployed();
    marketAddress = market.address;
  });

  it('Should create a new NFT', async () => {
    const NFT = await ethers.getContractFactory('NFT');
    const nft = await NFT.deploy(marketAddress);
    if (await nft.deployed()) {
      const nftContractAddress = nft.address;
      console.log(`NFT Contract Address: ${nftContractAddress}`);
    }
  });
});
