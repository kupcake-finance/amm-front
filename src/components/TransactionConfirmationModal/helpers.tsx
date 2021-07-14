import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Heading, IconButton, CloseIcon } from '@pancakeswap-libs/uikit'
import Divider from '@material-ui/core/Divider';
import { AutoColumn, ColumnCenter } from '../Column'


export const Wrapper = styled.div`
  width: 100%;
  overflow-y: auto;
`
export const Section = styled(AutoColumn)`
  padding: 24px;
`

export const ConfirmedIcon = styled(ColumnCenter)`
  padding: 40px 0;
`

export const BottomSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`

const StyledSwapButton = styled(IconButton)`
  background-color: #48cae4;
  box-shadow: none;
  transition: all 0s ease-in-out;
  border: 2px solid white;
  font-size: 30px;
  font-weight: 600;
  position: absolute;
  right: -30px;
  top: -30px;
  border-radius: 0;
  border-bottom-left-radius: 20px;

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

  & > svg,
    & > svg > * {
      fill: #fff;
      width: 30px;
    }
`

/**
 * TODO: Remove this when modal system from the UI Kit is implemented
 */
const StyledContentHeader = styled.div`
  align-items: center;
  display: flex;
  position: relative;

  & > ${Heading} {
    flex: 1;
  }
`

type ContentHeaderProps = {
  children: ReactNode
  onDismiss: () => void
}

const StyledHeading = styled(Heading)`
  text-align: center;
  font-size: 30px;
  margin-bottom: 10px;
  padding: 10px;
  font-family: 'M PLUS Rounded 1c',sans-serif !important;
  font-weight: 800;
  color: #48cae4;
  /* background-color: #000; */
`

export const ContentHeader = ({ children, onDismiss }: ContentHeaderProps) => (
  <>
  <StyledContentHeader>
    <StyledHeading>{children}</StyledHeading>
    <StyledSwapButton onClick={onDismiss} variant="text">
      <CloseIcon color="primary"/>
    </StyledSwapButton>
  </StyledContentHeader>
    <Divider />
    </>
)
