import React, { useRef } from 'react'
import styled from 'styled-components' 
import { Button, Flex, Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'

const PinkSpan = styled.span`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  color: #ff629a;
`

const MainTitle = styled(Heading)`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  color: #48cae4;
  font-size: 65px;
  font-weight: 900;
  margin-top: 60px;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 45px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 55px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 65px;
  }
`

const SubTitle = styled(MainTitle)`
  font-weight: 500;
  margin: 0;
  margin-top: -5px;
  font-family: 'Roboto', sans-serif;
  color: #ff629a;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 18px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 20px;
  }
`

const Hero = styled.div`
  align-items: center;
  /* background-image: url('/images/banners/banner6.png'); */
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: auto;
  margin-bottom: 0px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-bottom: 0px;
    padding-top: 11px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
    padding-top: 11px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    /* background-image: url('/images/banners/banner4.png'); */
    background-position: center;
    background-size: cover;
    margin-bottom: 0px;
    height: 180px;
    padding-top: 116px;
    /* padding-top: 116; */
  }
`

export default function HeroBlock() {
  return (
    <Hero>
      <Flex flexDirection="column">
        <MainTitle as="h1" size="xl" mb="24px" mt="30px" color="tertiary">
          <PinkSpan>Ku</PinkSpan>pcakeSwap
        </MainTitle>
        <SubTitle>The Aspiring Leading DEX on Kucoin Community Chain</SubTitle>
      </Flex>
    </Hero>
  )
}
