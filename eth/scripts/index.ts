import deployGreeter from './greeter';
import deployMarket from './market';
import deployNft from './nft';

async function main() {
  // Implementamos los contratos en el nodo configurado
  const greetAddress = await deployGreeter();
  console.log(`Greeter deployed in: ${greetAddress}`);

  const marketAddress = await deployMarket();
  console.log(`NFTMarket deployed in: ${marketAddress}`);

  const nftAddress = await deployNft(marketAddress.toString());
  console.log(`NFT deployed in: ${nftAddress}`);
}

main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
