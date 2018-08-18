import getWeb3 from "../utils/getWeb3";
const CertificatesContract = require('../../build/contracts/Certificates.json');
import * as contract from 'truffle-contract';
import { State } from "../state/certificate-assignment";
import { ThunkAction } from "../../node_modules/redux-thunk";
import { ChangeQuery } from "./certificate-holder-actions";

export const REQUEST_ADDITION = 'REQUEST_ADDITION';
export type REQUEST_ADDITION = typeof REQUEST_ADDITION;
export interface RequestAddition {
    type: REQUEST_ADDITION;
    candidate: string;
    certificate: number;
}
function createRequestAddition(candidate: string, certificate: number): RequestAddition {
    return {
        type: REQUEST_ADDITION,
        candidate,
        certificate
    }
}

export const REQUEST_SENT = 'REQUEST_SENT';
export type REQUEST_SENT = typeof REQUEST_SENT;
export interface RequestSent {
    type: REQUEST_SENT;
}
function requestSent(): RequestSent {
    return {
        type: REQUEST_SENT
    }
}

export const CHANGE_ASSIGNMENT_QUERY = 'CHANGE_ASSIGNMENT_QUERY';
export type CHANGE_ASSIGNMENT_QUERY = typeof CHANGE_ASSIGNMENT_QUERY;
export interface ChangeAssignment {
    type: CHANGE_ASSIGNMENT_QUERY;
    query: {
        candidate?: string,
        certificate?: string
    }
}
export function changeQuery(query: {candidate?: string, certificate?: string}): ChangeAssignment {
    return {
        type: CHANGE_ASSIGNMENT_QUERY,
        query
    }
}

export type Actions = RequestAddition | ChangeAssignment | RequestSent;


export function requestAddition(candidate: string, certificate: number): ThunkAction<void, State, undefined, Actions>  {
    const TODOaccount = "0xe19D07c1f95fc69103aDbAA13bC2CdDfB6c661DD";
    
    return function(dispatch) {
        dispatch(createRequestAddition(candidate, certificate));

        return getWeb3.then(
            ({web3}: any) => {
                const certificates = contract(CertificatesContract);
                certificates.setProvider(web3.currentProvider);
                
                web3.personal.unlockAccount(TODOaccount);

                return web3.eth.getAccounts((_: any, accounts: any) => {
                    certificates.deployed().then((instance: any) => {
                        instance.assign(candidate, certificate, {from: TODOaccount});
                    })
                    .then(() => {
                        dispatch(requestSent());
                    });
                })
            }
        )
    }
}