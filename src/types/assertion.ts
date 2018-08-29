import { Address } from "./ethereum-address";

export interface Assertion {
    certificate: string;
    issuer: Address;
}