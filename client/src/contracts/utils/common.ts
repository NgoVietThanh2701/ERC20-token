export type AddressType = {
   97: string;
   56: string;
}

export enum CHAIN_ID {
   TESTNET = 97,
   MAINNET = 56,
}

export default function getChainIdFrontEnv(): number {
   const env = process.env.NEXT_PUBLIC_CHAIN_ID;
   if (!env) return 97;
   return parseInt(env);
}

export const getRPC = () => {
   if (getChainIdFrontEnv() === CHAIN_ID.MAINNET)
      return process.env.NEXT_PUBLIC_RPC_MAINET;
   return process.env.NEXT_PUBLIC_RPC_TESTNET;
}

export const SMART_ADDRESS = {
   CROWD_SALE: { 97: '0xAa9A33BD9F49D06B7Ef3E800a0bF6317705282f8', 56: '' },
   USDT: { 97: '0x09a30803513b58461A3BaC7d2e82f4D99178aadA', 56: '' }
}