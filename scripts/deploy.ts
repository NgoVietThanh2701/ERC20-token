import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';

async function main() {
   await Config.initConfig();
   const network = hardhatArguments.network ?? 'dev';
   const [deployer] = await ethers.getSigners();
   console.log('deploy from address: ', deployer.address);

   // const Floppy = await ethers.getContractFactory("Floppy");
   // const floppy = await Floppy.deploy();
   // console.log('Floppy address: ', floppy.address);
   // Config.setConfig(network + '.Floppy', floppy.address);

   // const Vault = await ethers.getContractFactory("Vault");
   // const vault = await Vault.deploy();
   // console.log('Vault address: ', vault.address);
   // Config.setConfig(network + '.Vault', vault.address);

   // const USDT = await ethers.getContractFactory("USDT");
   // const usdt = await USDT.deploy();
   // console.log('USDT address: ', usdt.address);
   // Config.setConfig(network + '.USDT', usdt.address);

   const Ico = await ethers.getContractFactory("FLPCrowdSale");
   const ico = await Ico.deploy(10000, 1000,
      '0xcCBF9BcaAbeaE9d0F382695d6fFe31c39E533F17',
      '0x40928675ee466e1E4CD77b7710965cB3C1BAb446');
   console.log('ICO address: ', ico.address);
   Config.setConfig(network + '.Ico', ico.address);

   await Config.updateConfig();
}

main()
   .then(() => process.exit(0))
   .catch(err => {
      console.error(err);
      process.exit(1);
   })