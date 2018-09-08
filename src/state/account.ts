import { Address } from "../types/ethereum-address";

export enum Role {
    Educator,
    Reader
}

export interface Account {
    address: Address;
    role: Role;
}

export interface AccountState {
    account: Account | null;
}