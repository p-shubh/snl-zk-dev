/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IVRFMigratableConsumerV2PlusInterface extends utils.Interface {
  contractName: "IVRFMigratableConsumerV2Plus";
  functions: {
    "setCoordinator(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "setCoordinator",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "setCoordinator",
    data: BytesLike
  ): Result;

  events: {
    "CoordinatorSet(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CoordinatorSet"): EventFragment;
}

export type CoordinatorSetEvent = TypedEvent<
  [string],
  { vrfCoordinator: string }
>;

export type CoordinatorSetEventFilter = TypedEventFilter<CoordinatorSetEvent>;

export interface IVRFMigratableConsumerV2Plus extends BaseContract {
  contractName: "IVRFMigratableConsumerV2Plus";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IVRFMigratableConsumerV2PlusInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    setCoordinator(
      vrfCoordinator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  setCoordinator(
    vrfCoordinator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    setCoordinator(
      vrfCoordinator: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "CoordinatorSet(address)"(vrfCoordinator?: null): CoordinatorSetEventFilter;
    CoordinatorSet(vrfCoordinator?: null): CoordinatorSetEventFilter;
  };

  estimateGas: {
    setCoordinator(
      vrfCoordinator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    setCoordinator(
      vrfCoordinator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
