import { ChainId } from '@pancakeswap-libs/sdk'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Button, LinkExternal } from '@pancakeswap-libs/uikit'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { ArrowUpCircle } from 'react-feather'
import { AutoColumn } from '../Column'
import { getEtherscanLink } from '../../utils'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'

type TransactionSubmittedContentProps = {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
}
const StyledButton = styled(Button)`
  background-color: #48cae4;
  box-shadow: none;
  transition: all 0s ease-in-out;
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

const StyledCloudUploadIcon = styled(CloudUploadIcon)`
  font-size: 100px !important;
  color: #ff629a !important;
  margin: -10px auto !important;
`

const TransactionSubmittedContent = ({ onDismiss, chainId, hash }: TransactionSubmittedContentProps) => {
  const theme = useContext(ThemeContext)

  return (
    <Wrapper>
      <Section>
        <ContentHeader onDismiss={onDismiss}>Transaction submitted</ContentHeader>
        <ConfirmedIcon>
          <StyledCloudUploadIcon />
        </ConfirmedIcon>
        <AutoColumn gap="8px" justify="center">
          {chainId && hash && (
            <LinkExternal href={getEtherscanLink(chainId, hash, 'transaction')}>View on KCC Explorer</LinkExternal>
          )}
          <StyledButton onClick={onDismiss} mt="20px">
            Close
          </StyledButton>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default TransactionSubmittedContent
