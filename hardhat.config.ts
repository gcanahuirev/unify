import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';

import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: '0.8.4',
  networks: {
    goerli: {
      url: `${process.env.GOERLI_URL}`,
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
