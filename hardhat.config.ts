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
    sources: 'eth/contracts',
    tests: 'eth/test',
    cache: 'eth/cache',
    artifacts: 'eth/artifacts',
  },
  typechain: {
    outDir: 'eth/typechain',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false,
  },
  mocha: {
    slow: 150000,
  },
};

export default config;
