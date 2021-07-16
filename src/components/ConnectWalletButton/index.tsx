import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Button, ButtonProps, ConnectorId, useWalletModal } from '@pancakeswap-libs/uikit'
import { injected, walletconnect } from 'connectors'
import useI18n from 'hooks/useI18n'

const StyledSwapButton = styled(Button)`
  background-color: #48cae4;
  box-shadow: none;
  transition: all 0.2s ease-in-out;
  border: 2px solid white;
  font-size: 20px;
  font-weight: 600;

  &:hover {
    background-color: #fff;
    border: 2px solid #48cae4 !important;
    color: #48cae4;

    & > svg,
    & > svg > * {
      fill: #48cae4;
    }
  }

  &:focus {
    box-shadow: none !important;
  }

  &:active {
    background-color: #fff;
  }
`

const UnlockButton: React.FC<ButtonProps> = props => {
  const TranslateString = useI18n()
  const { account, activate, deactivate } = useWeb3React()

  const handleLogin = (connectorId: ConnectorId) => {
    if (connectorId === 'walletconnect') {
      return activate(walletconnect)
    }
    return activate(injected)
  }

  const { onPresentConnectModal } = useWalletModal(handleLogin, deactivate, account as string)

  return (
    <StyledSwapButton onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}
    </StyledSwapButton>
  )
}

export default UnlockButton
