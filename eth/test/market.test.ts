/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { ethers } from 'hardhat';

describe('Market', () => {
  let nftContractAddress: any;
  let auctionPrice: any;
  let listingPrice: { toString: () => any };
  let market: any;
  let nft: any;
  beforeEach(async () => {
    const Market = await ethers.getContractFactory('NFTMarket');
    market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory('NFT');
    nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    nftContractAddress = nft.address;

    listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    auctionPrice = ethers.utils.parseUnits('10', 'ether');
  });

  it('should create two tokens nft', async () => {
    const nft1 = await nft.createToken('https://www.mytokenlocation.com');
    const nft2 = await nft.createToken('https://www.mytokenlocation2.com');
    console.log('Hash nft 1:', nft1.hash);
    console.log('HAsh nft 2:', nft2.hash);
  });

  it('Should put on sale two nft', async () => {
    await nft.createToken('https://www.mytokenlocation.com');
    await nft.createToken('https://www.mytokenlocation2.com');
    const marketItem1 = await market.createMarketItem(
      nftContractAddress,
      1,
      auctionPrice,
      { value: listingPrice },
    );
    const marketItem2 = await market.createMarketItem(
      nftContractAddress,
      2,
      auctionPrice,
      { value: listingPrice },
    );
    console.log('Hash market item 1:', marketItem1.hash);
    console.log('Hash market item 2:', marketItem2.hash);
  });

  it('Should make a single sale', async () => {
    const [_, buyerAddress] = await ethers.getSigners();
    await nft.createToken('https://www.mytokenlocation.com');
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });

    const sale = await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice });
    console.log('Hash sale:', sale.hash);
  });

  it('Should return all unsold market items', async () => {
    await nft.createToken('https://www.mytokenlocation.com');
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    let items = await market.fetchMarketItems();

    items = await Promise.all(
      items.map(
        async (i: {
          tokenId: { toString: () => any };
          price: { toString: () => any };
          seller: any;
          owner: any;
        }) => {
          const tokenUri = await nft.tokenURI(i.tokenId);
          const item = {
            price: i.price.toString(),
            tokenId: i.tokenId.toString(),
            seller: i.seller,
            owner: i.owner,
            tokenUri,
          };
          return item;
        },
      ),
    );
    console.log('Market items:', items);
  });
});
