import { ethers } from 'hardhat';

const deployGreeter = async () => {
  const Greeter = await ethers.getContractFactory('Greeter');
  const greeter = await Greeter.deploy('Hello, Hardhat!');

  await greeter.deployed();

  return greeter.address;
};

export default deployGreeter;
