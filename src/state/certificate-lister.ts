import { Address } from "../types/ethereum-address";
import { EthereumOperationState } from "./ethereum-operation-state";
import { Assertion } from "./assertion";

export interface State {
    candidate: Address | null,
    status: EthereumOperationState,
    results: Assertion[]
}