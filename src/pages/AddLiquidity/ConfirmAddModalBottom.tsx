import { Currency, CurrencyAmount, Fraction, Percent } from '@pancakeswap-libs/sdk'
import React from 'react'
import styled from 'styled-components'
import { Button } from '@pancakeswap-libs/uikit'
import { RowBetween, RowFixed } from '../../components/Row'
import CurrencyLogo from '../../components/CurrencyLogo'
import { Field } from '../../state/mint/actions'
import { TYPE } from '../../components/Shared'

const { body: Body } = TYPE

const StyledSwapButton = styled(Button)`
  background-color: #48cae4;
  box-shadow: none;
  transition: all 0s ease-in-out;
  border: 2px solid white;
  font-size: 20px;
  font-weight: 600;
  margin: 10px auto;

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
export function ConfirmAddModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  return (
    <>
      <RowBetween>
        <Body>{currencies[Field.CURRENCY_A]?.symbol} Deposited</Body>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_A]} style={{ marginRight: '8px' }} />
          <Body>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Body>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Body>{currencies[Field.CURRENCY_B]?.symbol} Deposited</Body>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_B]} style={{ marginRight: '8px' }} />
          <Body>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Body>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Body>Rates</Body>
        <Body>
          {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${price?.toSignificant(4)} ${
            currencies[Field.CURRENCY_B]?.symbol
          }`}
        </Body>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <Body>
          {`1 ${currencies[Field.CURRENCY_B]?.symbol} = ${price?.invert().toSignificant(4)} ${
            currencies[Field.CURRENCY_A]?.symbol
          }`}
        </Body>
      </RowBetween>
      <RowBetween>
        <Body>Share of Pool:</Body>
        <Body>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</Body>
      </RowBetween>
      <StyledSwapButton mt="20px" onClick={onAdd}>
        {noLiquidity ? 'Create Pool & Supply' : 'Confirm Supply'}
      </StyledSwapButton>
    </>
  )
}

export default ConfirmAddModalBottom
