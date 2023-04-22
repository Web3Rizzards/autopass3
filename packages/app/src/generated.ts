// Generated by @wagmi/cli@0.1.15 on 4/22/2023 at 4:03:12 PM
import {
  getContract,
  GetContractArgs,
  readContract,
  ReadContractConfig,
  writeContract,
  WriteContractMode,
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractUnpreparedArgs,
  prepareWriteContract,
  PrepareWriteContractConfig,
  watchContractEvent,
  WatchContractEventConfig,
  WatchContractEventCallback,
} from '@wagmi/core'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AutopassPaymentGateway
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0x570954E230BE1b093e6Ff64801337c3Bd7c5a7Fc)
 * -
 */
export const autopassPaymentGatewayABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'orderId', internalType: 'string', type: 'string', indexed: false },
      { name: 'paymentId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'PaymentReceived',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'orderId', internalType: 'string', type: 'string' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'createPayment',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'paymentId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_to', internalType: 'address payable', type: 'address' }],
    name: 'withdrawFunds',
    outputs: [],
  },
] as const

/**
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0x570954E230BE1b093e6Ff64801337c3Bd7c5a7Fc)
 * -
 */
export const autopassPaymentGatewayAddress = {
  18: '0x07A583000b1C86b159e065D16c05fbD5A14f92A8',
  10200: '0x570954E230BE1b093e6Ff64801337c3Bd7c5a7Fc',
  31337: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
} as const

/**
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0x570954E230BE1b093e6Ff64801337c3Bd7c5a7Fc)
 * -
 */
export const autopassPaymentGatewayConfig = {
  address: autopassPaymentGatewayAddress,
  abi: autopassPaymentGatewayABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link autopassPaymentGatewayABI}__.
 *
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0x570954E230BE1b093e6Ff64801337c3Bd7c5a7Fc)
 * -
 */
export function getAutopassPaymentGateway(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof autopassPaymentGatewayAddress
  },
) {
  return getContract({
    abi: autopassPaymentGatewayABI,
    address:
      autopassPaymentGatewayAddress[config.chainId as keyof typeof autopassPaymentGatewayAddress],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link autopassPaymentGatewayABI}__.
 *
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0x570954E230BE1b093e6Ff64801337c3Bd7c5a7Fc)
 * -
 */
export function readAutopassPaymentGateway<
  TAbi extends readonly unknown[] = typeof autopassPaymentGatewayABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof autopassPaymentGatewayAddress
  },
) {
  return readContract({
    abi: autopassPaymentGatewayABI,
    address:
      autopassPaymentGatewayAddress[config.chainId as keyof typeof autopassPaymentGatewayAddress],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link autopassPaymentGatewayABI}__.
 *
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0x570954E230BE1b093e6Ff64801337c3Bd7c5a7Fc)
 * -
 */
export function writeAutopassPaymentGateway<
  TFunctionName extends string,
  TMode extends WriteContractMode,
  TChainId extends number = keyof typeof autopassPaymentGatewayAddress,
>(
  config:
    | (Omit<
        WriteContractPreparedArgs<typeof autopassPaymentGatewayABI, TFunctionName>,
        'abi' | 'address'
      > & {
        mode: TMode
        chainId?: TMode extends 'prepared' ? TChainId : keyof typeof autopassPaymentGatewayAddress
      })
    | (Omit<
        WriteContractUnpreparedArgs<typeof autopassPaymentGatewayABI, TFunctionName>,
        'abi' | 'address'
      > & {
        mode: TMode
        chainId?: TMode extends 'prepared' ? TChainId : keyof typeof autopassPaymentGatewayAddress
      }),
) {
  return writeContract({
    abi: autopassPaymentGatewayABI,
    address:
      autopassPaymentGatewayAddress[config.chainId as keyof typeof autopassPaymentGatewayAddress],
    ...config,
  } as WriteContractArgs<typeof autopassPaymentGatewayABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link autopassPaymentGatewayABI}__.
 *
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0x570954E230BE1b093e6Ff64801337c3Bd7c5a7Fc)
 * -
 */
export function prepareWriteAutopassPaymentGateway<
  TAbi extends readonly unknown[] = typeof autopassPaymentGatewayABI,
  TFunctionName extends string = string,
>(
  config: Omit<PrepareWriteContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof autopassPaymentGatewayAddress
  },
) {
  return prepareWriteContract({
    abi: autopassPaymentGatewayABI,
    address:
      autopassPaymentGatewayAddress[config.chainId as keyof typeof autopassPaymentGatewayAddress],
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link autopassPaymentGatewayABI}__.
 *
 * - [__View Contract on Gnosis Chiado Blockscout__](https://blockscout.chiadochain.net/address/0x570954E230BE1b093e6Ff64801337c3Bd7c5a7Fc)
 * -
 */
export function watchAutopassPaymentGatewayEvent<
  TAbi extends readonly unknown[] = typeof autopassPaymentGatewayABI,
  TEventName extends string = string,
>(
  config: Omit<WatchContractEventConfig<TAbi, TEventName>, 'abi' | 'address'> & {
    chainId?: keyof typeof autopassPaymentGatewayAddress
  },
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  return watchContractEvent(
    {
      abi: autopassPaymentGatewayABI,
      address:
        autopassPaymentGatewayAddress[config.chainId as keyof typeof autopassPaymentGatewayAddress],
      ...config,
    } as WatchContractEventConfig<TAbi, TEventName>,
    callback,
  )
}
