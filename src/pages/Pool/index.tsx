import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Pair } from '@pancakeswap-libs/sdk-v2'
import { Button, CardBody, Text } from '@pancakeswap-libs/uikit'
import { Link } from 'react-router-dom'
import CardNav from 'components/CardNav'
import Question from 'components/QuestionHelper'
import FullPositionCard from 'components/PositionCard'
import { useUserHasLiquidityInAllTokens } from 'data/V1'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { StyledInternalLink, TYPE } from 'components/Shared'
import { LightCard, GreyCard } from 'components/Card'
import { RowBetween, RowCenter } from 'components/Row'
import { AutoColumn } from 'components/Column'

import { useActiveWeb3React } from 'hooks'
import { usePairs } from 'data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { Dots } from 'components/swap/styleds'
import TranslatedText from 'components/TranslatedText'
import { TranslateString } from 'utils/translateTextHelpers'
import PageHeader from 'components/PageHeader'
import AppBody from '../AppBody'

const { body: Body } = TYPE

const StyledSwapButton = styled(Button)`
  background-color: #48cae4;
  color: #fff;
  display: inline-block !important;
  box-shadow: none;
  transition: all 0.2s ease-in-out;
  border: 2px solid white;
  font-size: 25px;
  font-weight: 600;
  padding: 10px;
  /* border-radius: 30px; */
  margin-top: 5px;
  margin-bottom: 15px;
  width: 100%;
  text-align: center;
  text-transform: capitalize !important;
  border: 4px solid #fff;
  &:hover {
    background-color: #fff;
    border: 4px solid #48cae4 !important;
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
const StyledPageHeader = styled(PageHeader)`
  width: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  border: 5px solid #fff !important;
`
export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens]
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  return (
    <>
      <CardNav activeIndex={1} />
      <AppBody>
        <StyledPageHeader title="Liquidity" description="Add liquidity to receive LP tokens">
          <StyledSwapButton as={Link} to="/add/ETH">
            Add Liquidity
          </StyledSwapButton>
        </StyledPageHeader>
        <AutoColumn gap="lg" justify="center">
          <CardBody>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowCenter padding="0 8px">
                <Text style={{ color: '#ff629a', fontWeight: 600 }} fontSize="20px">
                  YOUR LIQUIDITY
                </Text>
                <Question text="When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below." />
              </RowCenter>

              {!account ? (
                <GreyCard padding="40px">
                  <Body color="#747474" textAlign="center">
                    Connect to a wallet to view your liquidity.
                  </Body>
                </GreyCard>
              ) : v2IsLoading ? (
                <GreyCard padding="40px">
                  <Body color="#747474" textAlign="center">
                    <Dots>Loading</Dots>
                  </Body>
                </GreyCard>
              ) : allV2PairsWithLiquidity?.length > 0 ? (
                <>
                  {allV2PairsWithLiquidity.map((v2Pair) => (
                    <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                  ))}
                </>
              ) : (
                <GreyCard padding="40px">
                  <Body color="#000" textAlign="center">
                    No liquidity found.
                  </Body>
                </GreyCard>
              )}

              <div>
                <Text
                  fontSize="14px"
                  style={{
                    padding: '.5rem 0 .5rem 0',
                    color: '#000',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                >
                  {hasV1Liquidity ? 'Uniswap V1 liquidity found!' : "Don't see a pool you joined?"}{' '}
                  <StyledInternalLink id="import-pool-link" to={hasV1Liquidity ? '/migrate/v1' : '/find'}>
                    {hasV1Liquidity ? 'Migrate now.' : 'Import it.'}
                  </StyledInternalLink>
                </Text>
                <Text fontSize="14px" style={{ padding: '.5rem 0 .5rem 0', textAlign:"center" }}>
                  Are your LP tokens in a farm? <br/>Unstake them first and come back to see them show up here.
                </Text>
              </div>
            </AutoColumn>
          </CardBody>
        </AutoColumn>
      </AppBody>
    </>
  )
}
