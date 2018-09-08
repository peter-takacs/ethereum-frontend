import { ThunkAction } from "redux-thunk";
import { AccountState } from '../state/account';
import getWeb3 from "../utils/getWeb3";
import { getMembers } from "./network-member-actions";
import { Address } from '../types/ethereum-address';

export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT';
export type REQUEST_ACCOUNT = typeof REQUEST_ACCOUNT;

export interface RequestAccount {
    type: REQUEST_ACCOUNT;
}

export const SET_ACCOUNT = 'SET_ACCOUNT';
export type SET_ACCOUNT = typeof SET_ACCOUNT;

export interface SetAccount {
    type: SET_ACCOUNT;
    address: Address;
}
export function setAccount(address: Address) : Actions {
    return {
        type: SET_ACCOUNT,
        address
    }
}

export type Actions = RequestAccount | SetAccount;

export function requestAccount() : ThunkAction<void, AccountState, undefined, Actions> {
    return function(dispatch) {
        return getWeb3.then(
            ({web3}: any) => {
                const currentAccount: Address = new Address(web3.eth.accounts[0]);
                dispatch(setAccount(currentAccount));
                dispatch(getMembers() as any);
            }
        );
    }
}