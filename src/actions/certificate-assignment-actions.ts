import getWeb3 from "../utils/getWeb3";
const CertificatesContract = require('../../build/contracts/Certificates.json');
import * as contract from 'truffle-contract';
import { State } from "../state/certificate-assignment";
import { ThunkAction } from "../../node_modules/redux-thunk";
import { ChangeQuery } from "./certificate-holder-actions";
import { sha256 } from "../../node_modules/js-sha256";

export const REQUEST_ADDITION = 'REQUEST_ADDITION';
export type REQUEST_ADDITION = typeof REQUEST_ADDITION;
export interface RequestAddition {
    type: REQUEST_ADDITION;
    candidate: string;
    certificate: string;
}
function createRequestAddition(candidate: string, certificate: string): RequestAddition {
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


export function requestAddition(candidate: string, certificate: string): ThunkAction<void, State, undefined, Actions>  {
    return function(dispatch) {
        dispatch(createRequestAddition(candidate, certificate));

        return getWeb3.then(
            ({web3}: any) => {
                const currentAccount = web3.eth.accounts[0];
                const certificates = contract(CertificatesContract);
                certificates.setProvider(web3.currentProvider);
                
                web3.personal.unlockAccount(currentAccount);

                return web3.eth.getAccounts((_: any, accounts: any) => {
                    certificates.deployed().then((instance: any) => {
                        const hashedCertificate = `0x${sha256(certificate)}`;
                        
                        instance.assign(candidate, web3.toBigNumber(hashedCertificate), {from: currentAccount});
                    })
                    .then(() => {
                        dispatch(requestSent());
                    });
                })
            }
        )
    }
}