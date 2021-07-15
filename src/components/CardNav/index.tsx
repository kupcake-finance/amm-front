import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'
import TranslatedText from '../TranslatedText'

const StyledNav = styled.div`
  margin-top: 100px;
  margin-bottom: 40px;
`

const StyledTranslatedText = styled.span`
  font-weight: 600 !important;
`

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => (
  <StyledNav>
    <ButtonMenu activeIndex={activeIndex} size="sm" variant="subtle">
      <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
        <StyledTranslatedText>Swap</StyledTranslatedText>
      </ButtonMenuItem>
      <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
        <StyledTranslatedText>Liquidity</StyledTranslatedText>
      </ButtonMenuItem>
      {/* <ButtonMenuItem
        id="pool-nav-link"
        as="a"
        href="https://trade.kucoin.com/KCS-USDT"
        target="_blank"
        rel="noreferrer noopener"
      >
        Bridge
      </ButtonMenuItem> */}
    </ButtonMenu>
  </StyledNav>
)

export default Nav
