import { ethers } from 'hardhat';

const deployMarket = async () => {
  try {
    const NFTMarket = await ethers.getContractFactory('Market');
    const nftMarket = await NFTMarket.deploy();

    await nftMarket.deployed();

    return nftMarket.address;
  } catch (err) {
    return err;
  }
};

export default deployMarket;
