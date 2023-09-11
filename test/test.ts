import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers"
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised);
import { keccak256, Contract } from 'ethers';

function parseEther(amount: Number) {
   return ethers.parseUnits(amount.toString(), "ether");
}

describe("Vault", function () {
   let owner: SignerWithAddress,
      alice: SignerWithAddress,
      bob: SignerWithAddress,
      carol: SignerWithAddress;
   let vault: Contract;
   let token: Contract;

   beforeEach(async () => {
      await ethers.provider.send("hardhat_reset", []); /* reset network hardhat  */
      [owner, alice, bob, carol] = await ethers.getSigners();

      const Vault = await ethers.getContractFactory("Vault", owner);
      vault = await Vault.deploy();
      const Token = await ethers.getContractFactory("Floppy", owner);
      token = await Token.deploy();
      await vault.setToken(token.address)
   })
})