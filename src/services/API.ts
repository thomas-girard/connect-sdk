import axios from 'axios'
import { SiweMessage } from 'siwe'

import { API_URL } from '../constants'
import {
  RelayTransactionType,
  SponsoredTransaction,
  UserNonceType
} from '../wallet/types'

export const api = axios.create({
  baseURL: API_URL
})

export class API {
  constructor(apiKey: string) {
    api.defaults.headers.common['apikey'] = apiKey
  }

  async getNonce(account: string): Promise<UserNonceType> {
    const response = await api.get(`/wallets/connection-nonce/${account}`)
    return response?.data?.userNonce
  }

  async getSponsoredAddresses(): Promise<SponsoredTransaction[]> {
    const response = await api.get(`/sponsored-address`)
    return response?.data?.sponsoredAddresses
  }

  async connectToAlembicWallet({
    message,
    signature,
    ownerAddress
  }: {
    message: SiweMessage
    signature: string
    ownerAddress: string
  }): Promise<string> {
    const body = {
      message,
      signature,
      ownerAddress
    }

    const response = await api.post(`/wallets/connect`, body)
    const data = response?.data

    return data.walletAddress
  }

  async relayTransaction({
    walletAddress,
    safeTxData,
    signatures
  }: RelayTransactionType): Promise<string> {
    const body = {
      ...safeTxData,
      nonce: safeTxData?.nonce?.toString(),
      baseGas: safeTxData?.baseGas?.toString(),
      gasPrice: safeTxData?.gasPrice?.toString(),
      safeTxGas: safeTxData?.safeTxGas?.toString(),
      signatures
    }
    const response = await api.post(`/wallets/${walletAddress}/relay`, body)
    return response.data?.safeTxHash
  }
}
