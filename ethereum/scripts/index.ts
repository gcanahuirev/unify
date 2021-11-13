import deployGreeter from './greeter';
import deployMarket from './market';
import deployNft from './nft';

async function main() {
  // Implementamos los contratos en el nodo configurado
  await deployGreeter();
  await deployNft();
  await deployMarket();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
