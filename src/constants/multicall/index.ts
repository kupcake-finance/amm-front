import { ChainId } from '@pancakeswap-libs/sdk-v2'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb', // TODO
  [ChainId.BSCTESTNET]: '0x6e5BB1a5Ad6F68A8D7D6A5e47750eC15773d6042'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
