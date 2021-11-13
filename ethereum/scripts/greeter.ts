import { ethers } from 'hardhat';

const deployGreeter = async () => {
  const Greeter = await ethers.getContractFactory('Greeter');
  const greeter = await Greeter.deploy('Hello, Hardhat!');

  await greeter.deployed();

  console.log('Greeter deployed in:', greeter.address);
};

export default deployGreeter;
