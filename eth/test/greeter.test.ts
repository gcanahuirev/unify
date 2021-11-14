/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe('Greeter', () => {
  it("Should return the new greeting once it's changed", async () => {
    const Greeter = await ethers.getContractFactory('Greeter');
    const greeter = await Greeter.deploy('Hello, world!');
    await greeter.deployed();

    expect(await greeter.greet()).to.equal('Hello, world!');

    const setGreetingTx = await greeter.setGreeting('Hola, mundo!');

    // wait until the transaction is mined
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal('Hola, mundo!');
  });
});
