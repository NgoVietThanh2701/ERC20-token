import dotenv from 'dotenv'
dotenv.config();
import Web3 from 'web3'
import abi from '../contracts/abi.js'

class SmartContractDAO {
   constructor() {
      this.web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'))
      this.token_address = process.env.TOKEN_ADDRESS;
      this.vault_address = process.env.VAULT_ADDRESS;
      this.withdrawer_private_key = process.env.WITHDRAWER_PRIVATE_KEY;
      this.withdrawer_address = process.env.WITHDRAWER_ADDRESS;
   }

   async withdraw(address, amount) {
      this.web3.eth.accounts.wallet.add(this.withdrawer_private_key);
      const vault_contract = new this.web3.eth.Contract(
         abi.vault,
         this.vault_address,
         { from: this.withdrawer_address }
      )
      // sender privatekey
      var value = Web3.utils.toWei(amount.toString(), "ether");
      var rs = await vault_contract.methods
         .withdraw(value, address)
         .send({
            from: this.withdrawer_address,
            gas: 3000000
         });
      return rs.transactionHash;
   }
}

export default SmartContractDAO;