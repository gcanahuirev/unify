import { ethers } from 'hardhat';

const deployNft = async () => {
  const NFT = await ethers.getContractFactory('NFT');
  const nft = await NFT.deploy();

  await nft.deployed();

  console.log('NFT deployed in:', nft.address);
};

export default deployNft;
