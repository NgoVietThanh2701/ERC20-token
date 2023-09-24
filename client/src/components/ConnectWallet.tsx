import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

interface Iprops extends ButtonProps { }

export default function ConnectWallet({ ...props }: Iprops) {
   return (
      <Button variant='primary' {...props}>
         Connect wallet
      </Button>
   )
}
