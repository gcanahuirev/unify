import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';

import { HardhatUserConfig, task } from 'hardhat/config';

task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  let index = 1;

  accounts.map(async (account) => {
    const item = await account.getAddress();
    console.log(`account ${index}:`, item);
    index++;
  });
});

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: '0.8.4',
  networks: {
    goerli: {
      url: process.env.GOERLI_URL,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    sources: 'ethereum/contracts',
    tests: 'ethereum/test',
    cache: 'ethereum/cache',
    artifacts: 'ethereum/artifacts',
  },
  mocha: {
    slow: 150000,
  },
};

export default config;
