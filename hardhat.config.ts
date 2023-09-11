import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + '/.env' });
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
   solidity: "0.8.19",
   networks: {
      bsctest: {
         url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
         accounts: [process.env.PRIVATE_KEY]
      }
   },
   etherscan: {
      apiKey: process.env.API_KEY
   }
};
