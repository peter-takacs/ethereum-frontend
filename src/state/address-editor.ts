import { Address } from "../types/ethereum-address";

export interface State {
    placeholder?: string;
    address: Address | null
}