import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Trade, TradeType } from '@pancakeswap-libs/sdk'
import { Button, Text } from '@pancakeswap-libs/uikit'
import Divider from '@material-ui/core/Divider'
import { ArrowDown, AlertTriangle } from 'react-feather'

import { Field } from '../../state/swap/actions'
import { TYPE } from '../Shared'
import { isAddress, shortenAddress } from '../../utils'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity } from '../../utils/prices'
import { AutoColumn } from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import { RowBetween, RowFixed } from '../Row'
import { SwapShowAcceptChanges } from './styleds'

const { main: Main } = TYPE

const PriceInfoText = styled(Text)`
  font-style: italic;
  line-height: 1.3;
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`

const StyledButton = styled(Button)`
  font-family: 'Roboto', sans-serif !important;
  background-color: #48cae4;
  margin-right: 5px;
  height: 40px;
  font-weight: 600;
  /* width: 40px; */
  box-shadow: none;
  transition: all 0.2s ease-in-out;
    border: 2px solid #fff !important;

  & > svg,
  & > svg > * {
    fill: #fff;
  }

  &:hover {
    color: #48cae4;
    background-color: #fff;
    border: 2px solid #48cae4 !important;

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

export default function SwapModalHeader({
  trade,
  allowedSlippage,
  recipient,
  showAcceptChanges,
  onAcceptChanges,
}: {
  trade: Trade
  allowedSlippage: number
  recipient: string | null
  showAcceptChanges: boolean
  onAcceptChanges: () => void
}) {
  const slippageAdjustedAmounts = useMemo(() => computeSlippageAdjustedAmounts(trade, allowedSlippage), [
    trade,
    allowedSlippage,
  ])
  const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  const theme = useContext(ThemeContext)

  return (
    <AutoColumn gap="md" style={{ marginTop: '20px' }}>
      <RowBetween align="flex-end">
        <RowFixed gap="0px">
          <CurrencyLogo currency={trade.inputAmount.currency} size="34px" style={{ marginRight: '12px' }} />
          <Text
            fontSize="24px"
            color={showAcceptChanges && trade.tradeType === TradeType.EXACT_OUTPUT ? theme.colors.primary : 'text'}
          >
            {trade.inputAmount.toSignificant(6)}
          </Text>
        </RowFixed>
        <RowFixed gap="0px">
          <Text fontSize="24px" style={{ marginLeft: '10px', fontWeight: 600, color: '#ff629a' }}>
            {trade.inputAmount.currency.symbol}
          </Text>
        </RowFixed>
      </RowBetween>
      <RowFixed>
        <ArrowDown size="16" color={theme.colors.textSubtle} style={{ marginLeft: '4px', minWidth: '16px' }} />
      </RowFixed>
      <RowBetween align="flex-end">
        <RowFixed gap="0px">
          <CurrencyLogo currency={trade.outputAmount.currency} size="34px" style={{ marginRight: '12px' }} />
          <Text
            fontSize="24px"
            style={{ marginLeft: '10px', fontWeight: 500 }}
            color={
              priceImpactSeverity > 2
                ? theme.colors.failure
                : showAcceptChanges && trade.tradeType === TradeType.EXACT_INPUT
                ? theme.colors.primary
                : 'text'
            }
          >
            {trade.outputAmount.toSignificant(6)}
          </Text>
        </RowFixed>
        <RowFixed gap="0px">
          <Text fontSize="24px" style={{ marginLeft: '10px', fontWeight: 600, color: '#ff629a' }}>
            {trade.outputAmount.currency.symbol}
          </Text>
        </RowFixed>
      </RowBetween>
      {showAcceptChanges ? (
        <SwapShowAcceptChanges justify="flex-start" gap="0px" style={{ width: "100%" }}>
          <RowBetween>
            <RowFixed>
              <AlertTriangle size={20} style={{ marginRight: '8px', minWidth: 24, color:"#ff629a",fontWeight:900 }} />
              <Main color="#ff629a" style={{fontWeight:600}}> Price Updated</Main>
            </RowFixed>
            <StyledButton onClick={onAcceptChanges}>Accept</StyledButton>
          </RowBetween>
        </SwapShowAcceptChanges>
      ) : null}

      <Divider />

      <AutoColumn justify="flex-start" gap="sm" style={{ padding: '16px' }}>
        {trade.tradeType === TradeType.EXACT_INPUT ? (
          <PriceInfoText>
            {`Output is estimated. You will receive at least `}
            <span>
              {slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(6)} {trade.outputAmount.currency.symbol}
            </span>
            {' or the transaction will revert.'}
          </PriceInfoText>
        ) : (
          <PriceInfoText>
            {`Input is estimated. You will sell at most `}
            <span>
              {slippageAdjustedAmounts[Field.INPUT]?.toSignificant(6)} {trade.inputAmount.currency.symbol}
            </span>
            {' or the transaction will revert.'}
          </PriceInfoText>
        )}
      </AutoColumn>

      <Divider />

      {recipient !== null ? (
        <AutoColumn justify="flex-start" gap="sm" style={{ padding: '16px 0 0' }}>
          <Main>
            Output will be sent to{' '}
            <b title={recipient}>{isAddress(recipient) ? shortenAddress(recipient) : recipient}</b>
          </Main>
        </AutoColumn>
      ) : null}
    </AutoColumn>
  )
}
