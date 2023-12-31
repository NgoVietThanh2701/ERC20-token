import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { Contract } from 'ethers';
import { keccak256 } from 'ethers/lib/utils';

function parseEther(amount: number) {
   return ethers.utils.parseEther(amount.toString());
}

// describe("Vault", function () {
//    let owner: SignerWithAddress,
//       alice: SignerWithAddress,
//       bob: SignerWithAddress,
//       carol: SignerWithAddress;
//    let vault: Contract;
//    let token: Contract;

//    beforeEach(async () => {
//       await ethers.provider.send("hardhat_reset", []); /* reset network hardhat  */
//       [owner, alice, bob, carol] = await ethers.getSigners();

//       const Vault = await ethers.getContractFactory("Vault", owner);
//       vault = await Vault.deploy();
//       const Token = await ethers.getContractFactory("Floppy", owner);
//       token = await Token.deploy();
//       await vault.setToken(token.address);
//    })
//    /* positive testing*/
//    it("Should deposit into the Vault", async () => {
//       await token.transfer(alice.address, parseEther(1 * 10 ** 6));
//       /* alice approve for get all token to vault */
//       await token.connect(alice).approve(vault.address, token.balanceOf(alice.address));
//       await vault.connect(alice).deposit(parseEther(500 * 10 ** 3));
//       expect(await token.balanceOf(vault.address)).equal(parseEther(500 * 10 ** 3));
//    });
//    it("Should withdraw", async () => {
//       /* grant withdrawer role to Bob */
//       let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
//       await vault.grantRole(WITHDRAWER_ROLE, bob.address);

//       /* setter vault functions */
//       await vault.setWithdrawEnable(true);
//       await vault.setMaxWithdrawAmount(parseEther(1 * 10 ** 6));

//       /* alice deposit into the vault */
//       await token.transfer(alice.address, parseEther(1 * 10 ** 6));
//       await token.connect(alice).approve(vault.address, token.balanceOf(alice.address));
//       await vault.connect(alice).deposit(parseEther(5 * 10 ** 5));

//       /* bob withdraw into alice address */
//       await vault.connect(bob).withdraw(parseEther(3 * 10 ** 5), alice.address);

//       expect(await token.balanceOf(vault.address)).equal(parseEther(2 * 10 ** 5));
//       expect(await token.balanceOf(alice.address)).equal(parseEther(8 * 10 ** 5));
//    });
//    /* negative testing */
//    it("Should not deposit, Insufficient account balance", async () => {
//       await token.transfer(alice.address, parseEther(1 * 10 ** 6));
//       await token.connect(alice).approve(vault.address, token.balanceOf(alice.address));
//       await expect(vault.connect(alice).deposit(parseEther(2 * 10 ** 6))).revertedWith('Insufficient account balance');
//    });
//    it('Should not withdraw, Withdraw is not available', async () => {
//       /* grant withdrawer role to Bob */
//       let WITHDRAWER_ROLE = keccak256(Buffer.from('WITHDRAWER_ROLE')).toString();
//       await vault.grantRole(WITHDRAWER_ROLE, bob.address);

//       /* setter vault functions */
//       await vault.setWithdrawEnable(false);
//       await vault.setMaxWithdrawAmount(parseEther(1 * 10 ** 6));

//       /* alice deposit into the vault */
//       await token.transfer(alice.address, parseEther(1 * 10 ** 6));
//       await token.connect(alice).approve(vault.address, token.balanceOf(alice.address));
//       await vault.connect(alice).deposit(parseEther(5 * 10 ** 5));

//       // bob withdraw into alice address
//       await expect(vault.connect(bob).withdraw(parseEther(3 * 10 ** 5), alice.address))
//          .revertedWith('Withdraw is not available');
//    });
//    it("Should not withdraw, Exceed maximum amount", async () => {
//       // grant withdrawer role to bob
//       let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
//       await vault.grantRole(WITHDRAWER_ROLE, bob.address);

//       /* setter vault functions */
//       await vault.setWithdrawEnable(true);
//       await vault.setMaxWithdrawAmount(parseEther(1 * 10 ** 3));

//       // alice deposit into the vault
//       await token.transfer(alice.address, parseEther(1 * 10 ** 6));
//       await token.connect(alice).approve(vault.address, token.balanceOf(alice.address));
//       await vault.connect(alice).deposit(parseEther(5 * 10 ** 5));

//       // bob withdraw into alice address
//       await expect(vault.connect(bob).withdraw(parseEther(2 * 10 ** 3), alice.address))
//          .revertedWith('Exceed maximum amount');
//    });
//    it("Should not withdraw, Caller is not a withdrawer", async () => {
//       // grant withdrawer role to bob
//       let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
//       await vault.grantRole(WITHDRAWER_ROLE, bob.address);

//       /* setter vault functions */
//       await vault.setWithdrawEnable(true);
//       await vault.setMaxWithdrawAmount(parseEther(1 * 10 ** 3));

//       // alice deposit into the vault
//       await token.transfer(alice.address, parseEther(1 * 10 ** 6));
//       await token.connect(alice).approve(vault.address, token.balanceOf(alice.address));
//       await vault.connect(alice).deposit(parseEther(5 * 10 ** 5));

//       //carol withdraw into the address
//       await expect(vault.connect(carol).withdraw(parseEther(1 * 10 ** 3), alice.address))
//          .revertedWith("Caller is not a withdrawer");
//    });
//    it("Should not withdraw, ERC20: transfer amount exceeds balance", async () => {
//       // grant withdrawer role to bob
//       let WITHDRAWER_ROLE = keccak256(Buffer.from("WITHDRAWER_ROLE")).toString();
//       await vault.grantRole(WITHDRAWER_ROLE, bob.address);

//       /* setter vault functions */
//       await vault.setWithdrawEnable(true);
//       await vault.setMaxWithdrawAmount(parseEther(5 * 10 ** 3));

//       // alice deposit into the vault
//       await token.transfer(alice.address, parseEther(1 * 10 ** 6));
//       await token.connect(alice).approve(vault.address, token.balanceOf(alice.address));
//       await vault.connect(alice).deposit(parseEther(2 * 10 ** 3));

//       // bob withdraw into alice address
//       await expect(vault.connect(bob).withdraw(parseEther(3 * 10 ** 3), alice.address))
//          .revertedWith("ERC20: transfer amount exceeds balance");
//    })
// });

describe("FLPCrowdSale", function () {
   let owner: SignerWithAddress,
      alice: SignerWithAddress,
      bob: SignerWithAddress;
   let flpCrowdSale: Contract;
   let token: Contract;
   let usdt: Contract;

   beforeEach(async () => {
      await ethers.provider.send("hardhat_reset", []); /* reset network hardhat  */
      [owner, alice, bob] = await ethers.getSigners();

      const FLPCrowdSale = await ethers.getContractFactory("FLPCrowdSale", owner);
      flpCrowdSale = await FLPCrowdSale.deploy(10000, 1000,
         '0xcCBF9BcaAbeaE9d0F382695d6fFe31c39E533F17',
         '0x40928675ee466e1E4CD77b7710965cB3C1BAb446');
      const USDT = await ethers.getContractFactory("USDT", owner);
      usdt = await USDT.deploy();
      const Token = await ethers.getContractFactory("Floppy", owner);
      token = await Token.deploy();
   });
   it('Should buy floppy by usdt', async () => {
      await usdt.transfer(alice.address, parseEther(10));
      console.log(await usdt.balanceOf(alice.address));
      await usdt.connect(alice).approve(flpCrowdSale.address, usdt.balanceOf(alice.address));
      await flpCrowdSale.connect(alice).buyTokenByUSDT(parseEther(1));
      expect(await token.balanceOf(alice.address)).equal(parseEther(1000));
   })
})