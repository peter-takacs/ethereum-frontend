const EducatorNetworkContract = require('../../build/contracts/EducatorNetwork.json');

import * as contract from 'truffle-contract';
import { ThunkAction } from "redux-thunk";
import { AccountState, Role, Account } from '../state/account';
import getWeb3 from "../utils/getWeb3";
import { getMembers } from "./network-member-actions";
import { Address } from '../types/ethereum-address';
import { getDeployedContracts } from '../utils/contract-api';

export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT';
export type REQUEST_ACCOUNT = typeof REQUEST_ACCOUNT;

export interface RequestAccount {
    type: REQUEST_ACCOUNT;
}

export const SET_ACCOUNT = 'SET_ACCOUNT';
export type SET_ACCOUNT = typeof SET_ACCOUNT;

export interface SetAccount {
    type: SET_ACCOUNT;
    account: Account;
}

export function setAccount(address: Address, role: Role) : Actions {
    return {
        type: SET_ACCOUNT,
        account: {
            address,
            role
        }
    }
}

export type Actions = RequestAccount | SetAccount;

export function requestAccount() : ThunkAction<void, AccountState, undefined, Actions> {
    return async function (dispatch) {
        
        const { educatorNetwork, currentAccount } = await getDeployedContracts();

        const members: string[] = await educatorNetwork.getMembers.call();
        let role: Role;
        if (members.map(s => s.toUpperCase()).includes(currentAccount.toString().toUpperCase())) {
            role = Role.Educator;
        }
        else {
            role = Role.Reader;
        }
        dispatch(setAccount(currentAccount, role));
    }
}