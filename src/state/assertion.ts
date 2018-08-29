import { Address } from "../types/ethereum-address";

export interface Assertion {
    certificate: string;
    issuer: Address;
}