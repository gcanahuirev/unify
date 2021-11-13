import { ethers } from 'hardhat';

const deployMarket = async () => {
  const NFTMarket = await ethers.getContractFactory('Market');
  const nftMarket = await NFTMarket.deploy();

  await nftMarket.deployed();

  console.log('NFTMarket deployed in:', nftMarket.address);
};

export default deployMarket;
