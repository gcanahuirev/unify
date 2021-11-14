import { ethers } from 'hardhat';

const deployNft = async (adress: string) => {
  try {
    const NFT = await ethers.getContractFactory('NFT');
    const nft = await NFT.deploy(adress);

    await nft.deployed();

    return nft.address;
  } catch (err) {
    return err;
  }
};

export default deployNft;
