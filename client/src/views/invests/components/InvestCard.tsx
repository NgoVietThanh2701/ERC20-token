import React from 'react'
import { Box, Image, Text, Button, HStack, Spinner } from '@chakra-ui/react'
import { IPackage, IWalletInfo } from '../../../_types_'
import { numberFormat } from '../../../utils';

interface IProps {
   pak: IPackage;
   isBuying: boolean;
   rate: number;
   walletInfo?: IWalletInfo;
   onBuy?: () => void;
}

export default function InvestCard(
   {
      pak,
      isBuying,
      rate,
      walletInfo,
      onBuy
   }: IProps) {
   return (
      <Box
         w='320px'
         bg="bg.secondary"
         borderRadius='16px'
         overflow='hidden'
         padding='10px'
         border='1px solid rgba(254,223,86, .6)'
         alignItems='center'
         display='flex'
         flexDirection='column'
      >
         <Box
            bgImage={`/${pak.bg}`}
            w='full'
            h='210px'
            borderRadius='16px'
            bgSize='cover'
            bgPos='center'
         />
         <Box
            w='100px'
            h='100px'
            margin='0px auto'
            borderRadius='full'
            marginTop='-60px'
            position='relative'
         >
            <Image
               src={`/${pak.icon}`}
               alt='bnb'
               w='100px'
               h='100px'
               borderRadius='full'
               objectFit='cover'
               border='6px solid rgba(254, 223, 86, .6)'
            />
            <Image
               src="/vercel.svg"
               alt="verified"
               w='80px'
               position='absolute'
               bottom='-30px'
               right='-20px'
            />
         </Box>

         <Text my='20px' fontSize='24px' fontWeight='bold'>
            {pak.name}
         </Text>

         <Button
            disabled
            variant="primary"
            my="20px"
            bg="transparent"
            border="1px solid #fff"
            color="rgba(255,255,255, 0.7)"
         >
            {numberFormat(pak.amount)} IPT
         </Button>

         <HStack my="15px">
            <Text color="gray">Amount of coins to pay: </Text>
            <Text variant="notoSan" fontSize="16px">
               {numberFormat(pak.amount / rate)} {pak.token}
            </Text>
         </HStack>

         <Button w='full' variant='primary'
            disabled={!walletInfo?.address || isBuying}
            onClick={onBuy}>
            {isBuying ? <Spinner /> : 'Buy Now'}
         </Button>
      </Box>
   )
}
