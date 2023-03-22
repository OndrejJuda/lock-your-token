import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  ILoyotos,
  ILoyotosMethodNames,
  ILoyotosEventsContext,
  ILoyotosEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type ILoyotosEvents =
  | 'EnvelopeCreated'
  | 'EnvelopeWithdrawn'
  | 'FundsDeposited';
export interface ILoyotosEventsContext {
  EnvelopeCreated(...parameters: any): EventFilter;
  EnvelopeWithdrawn(...parameters: any): EventFilter;
  FundsDeposited(...parameters: any): EventFilter;
}
export type ILoyotosMethodNames =
  | 'new'
  | 'createEnvelope'
  | 'envelopes'
  | 'envelopesCount'
  | 'envelopesCountByOwner'
  | 'getEnvelopesByOwner'
  | 'sendEthToEnvelope'
  | 'withdraw';
export interface EnvelopeCreatedEventEmittedResponse {
  _id: BigNumberish;
  owner: string;
}
export interface EnvelopeWithdrawnEventEmittedResponse {
  _id: BigNumberish;
  owner: string;
}
export interface FundsDepositedEventEmittedResponse {
  _id: BigNumberish;
  _depositor: string;
  _amount: BigNumberish;
  _totalAmount: BigNumberish;
}
export interface EnvelopesResponse {
  id: BigNumber;
  0: BigNumber;
  weiAmount: BigNumber;
  1: BigNumber;
  lockEnd: BigNumber;
  2: BigNumber;
  owner: string;
  3: string;
  isWithdrawn: boolean;
  4: boolean;
  title: string;
  5: string;
  length: 6;
}
export interface OwnerEnvelopesResponse {
  id: BigNumber;
  0: BigNumber;
  weiAmount: BigNumber;
  1: BigNumber;
  lockEnd: BigNumber;
  2: BigNumber;
  owner: string;
  3: string;
  isWithdrawn: boolean;
  4: boolean;
  title: string;
  5: string;
}
export interface ILoyotos {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   */
  'new'(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _lockEnd Type: uint64, Indexed: false
   * @param _title Type: string, Indexed: false
   */
  createEnvelope(
    _lockEnd: BigNumberish,
    _title: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  envelopes(
    parameter0: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<EnvelopesResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  envelopesCount(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  envelopesCountByOwner(
    parameter0: string,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  getEnvelopesByOwner(
    _owner: string,
    overrides?: ContractCallOverrides
  ): Promise<OwnerEnvelopesResponse[]>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _id Type: uint256, Indexed: false
   */
  sendEthToEnvelope(
    _id: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _id Type: uint256, Indexed: false
   */
  withdraw(
    _id: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
