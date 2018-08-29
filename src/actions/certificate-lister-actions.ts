
const CertificatesContract = require('../../build/contracts/Certificates.json');
import getWeb3 from '../utils/getWeb3'
import * as contract from 'truffle-contract';
import { ThunkAction } from '../../node_modules/redux-thunk';
import { State } from '../state/certificate-checker';
import { CandidateQuery } from '../state/candidate-query';
import { sha256 } from '../../node_modules/js-sha256';
import { Address } from '../types/ethereum-address';
import { Assertion } from '../types/assertion';

export const REQUEST_ASSERTIONS = 'REQUEST_ASSERTIONS';
export type REQUEST_ASSERTIONS = typeof REQUEST_ASSERTIONS;
export interface RequestAssertions {
    type: REQUEST_ASSERTIONS,
    candidate: Address
}
function requestAssertions(candidate: Address): Actions {
    return {
        type: REQUEST_ASSERTIONS,
        candidate
    };
}

export const RECEIVE_ASSERTIONS = 'RECEIVE_ASSERTIONS';
export type RECEIVE_ASSERTIONS = typeof RECEIVE_ASSERTIONS;
export interface ReceiveAssertions {
    type: RECEIVE_ASSERTIONS,
    assertions: Assertion[]
}
function receiveAssertions(assertions: Assertion[]): Actions {
    return {
        type: RECEIVE_ASSERTIONS,
        assertions  
    }
}

export const CHANGE_ASSERTIONS_QUERY = 'CHANGE_ASSERTIONS_QUERY';
export type CHANGE_ASSERTIONS_QUERY = typeof CHANGE_ASSERTIONS_QUERY;
export interface ChangeCandidate {
    type: CHANGE_ASSERTIONS_QUERY,
    candidate: Address
} 
export function changeQuery(candidate: Address): ChangeCandidate {
    return {
        type: CHANGE_ASSERTIONS_QUERY,
        candidate
    }
}

export type Actions = ReceiveAssertions | RequestAssertions | ChangeCandidate; 

export function getAssertions(candidate: Address): ThunkAction<void, State, undefined, Actions> {
    return function (dispatch) {
        dispatch(requestAssertions(candidate));

        return getWeb3
        .then((results: any) => {
            const web3 = results.web3;

            const certificates = contract(CertificatesContract)
            certificates.setProvider(web3.currentProvider);
            return web3.eth.getAccounts(() => {
                certificates.deployed().then((instance: any) => {
                    return instance.getCertificates.call(candidate)
                })
                .then((result: any[]) => {
                    //TODO
                    dispatch(receiveAssertions(<Assertion[]>result));
                })
            });
        });
    }
}