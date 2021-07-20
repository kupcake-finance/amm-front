import { ChainId } from '@pancakeswap-libs/sdk-v2'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb', // TODO
  [ChainId.BSCTESTNET]: '0xc5923b319ea4D0F76639e63db91cFF9F2550fd89'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
