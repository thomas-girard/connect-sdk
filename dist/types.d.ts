import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types';
import { UserInfo } from '@web3auth/base';
export type UserNonceType = {
    userAddress: string;
    connectionNonce: string;
};
export type Constructor<T> = new (...args: any[]) => T;
export type RelayTransactionType = {
    safeTxData: SafeTransactionDataPartial;
    signatures: string;
    smartWalletAddress: string;
};
export type UserInfos = Partial<UserInfo> & {
    ownerAddress: string;
    smartWalletAddress: string;
};
