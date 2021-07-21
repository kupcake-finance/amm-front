import React, { useMemo } from 'react'
import styled from 'styled-components'
import { CheckmarkCircleIcon, ErrorIcon, Flex, LinkExternal, Text, Modal, Button } from '@pancakeswap-libs/uikit'
import { useActiveWeb3React } from 'hooks'
import { getEtherscanLink } from 'utils'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import Loader from 'components/Loader'

type RecentTransactionsModalProps = {
  onDismiss?: () => void
}

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

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const newTransactionsFirst = (a: TransactionDetails, b: TransactionDetails) => b.addedTime - a.addedTime

const getRowStatus = (sortedRecentTransaction: TransactionDetails) => {
  const { hash, receipt } = sortedRecentTransaction

  if (!hash) {
    return { icon: <Loader />, color: 'text' }
  }

  if (hash && receipt?.status === 1) {
    return { icon: <CheckmarkCircleIcon color="success" />, color: 'success' }
  }

  return { icon: <ErrorIcon color="failure" />, color: 'failure' }
}

const RecentTransactionsModal = ({ onDismiss = defaultOnDismiss }: RecentTransactionsModalProps) => {
  const { account, chainId } = useActiveWeb3React()
  const allTransactions = useAllTransactions()

  // Logic taken from Web3Status/index.tsx line 175
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  return (
    <Modal title="Recent Transactions" onDismiss={onDismiss}>
      {!account && (
        <Flex justifyContent="center" flexDirection="column" alignItems="center">
          <Text mb="8px" bold>
            Please connect your wallet to view your recent transactions
          </Text>
          <StyledButton variant="tertiary" size="sm" onClick={onDismiss}>
            Close
          </StyledButton>
        </Flex>
      )}
      {account && chainId && sortedRecentTransactions.length === 0 && (
        <Flex justifyContent="center" flexDirection="column" alignItems="center">
          <Text mb="8px" bold>
            No recent transactions
          </Text>
          <StyledButton variant="tertiary" size="sm" onClick={onDismiss}>
            Close
          </StyledButton>
        </Flex>
      )}
      {account &&
        chainId &&
        sortedRecentTransactions.map((sortedRecentTransaction) => {
          const { hash, summary } = sortedRecentTransaction
          const { icon, color } = getRowStatus(sortedRecentTransaction)

          return (
            <>
              <Flex key={hash} alignItems="center" justifyContent="space-between" mb="4px">
                <LinkExternal href={getEtherscanLink(chainId, hash, 'transaction')} color={color}>
                  {summary ?? hash}
                </LinkExternal>
                {icon}
              </Flex>
            </>
          )
        })}
    </Modal>
  )
}

export default RecentTransactionsModal
