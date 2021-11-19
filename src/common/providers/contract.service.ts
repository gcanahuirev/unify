/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import axios from 'axios';

import { BigNumber } from 'ethers';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'hardhat';

import { NFT__factory, NFTMarket__factory } from '~typechain';

export class ContractService {
  abi: string;

  constructor(protected readonly configService: ConfigService, abi: string) {
    this.abi = abi;
  }

  private readonly provider = new ethers.providers.JsonRpcProvider();

  private readonly tokenContract = new ethers.Contract(
    this.configService.get<string>('contract.nftAddress'),
    NFT__factory.abi,
    this.provider,
  );

  private readonly marketContract = new ethers.Contract(
    this.configService.get<string>('contract.marketAddress'),
    NFTMarket__factory.abi,
    this.provider,
  );

  async loadNFT(): Promise<any> {
    const data = await this.marketContract.fetchMarketItems();
    interface NewType {
      tokenId: BigNumber;
      price: BigNumber;
      itemId: BigNumber;
      seller: string;
      owner: string;
    }

    const items: any = await Promise.all(
      data.map(async (i: NewType) => {
        const tokenUri = await this.tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        const price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        const item = {
          price,
          itemId: i.itemId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      }),
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return items;
  }

  async buyNFT(signer: any, nft: any): Promise<any> {
    const contract = new ethers.Contract(
      this.configService.get<string>('contract.marketAddress'),
      NFTMarket__factory.abi,
      signer,
    );

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(
      this.configService.get<string>('contract.nftAddress'),
      nft.itemId,
      {
        value: price,
      },
    );
    await transaction.wait();
    return true;
  }
}
