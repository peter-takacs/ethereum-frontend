
const CertificatesContract = require('../../build/contracts/Certificates.json');
import getWeb3 from '../utils/getWeb3'
import * as contract from 'truffle-contract';
import { ThunkAction } from '../../node_modules/redux-thunk';
import { State } from '../state/certificate-lister';
import { CandidateQuery } from '../state/candidate-query';
import { sha256 } from '../../node_modules/js-sha256';
import { Address } from '../types/ethereum-address';
import { Assertion } from '../types/assertion';
import { getContractEnvironment } from '../utils/contract-api';

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
    return async function (dispatch) {
        dispatch(requestAssertions(candidate));

        const { certificates, web3, currentAccount } = await getContractEnvironment();
        const result: any[] = await certificates.getCertificates.call(candidate.toString());
        let assertions: Assertion[] = [];
        for (let i = 0; i < result[0].length; i++) {
            assertions.push({
                certificate: result[0][i].toString(16),
                issuer: new Address(result[1][i])
            })
        }
        dispatch(receiveAssertions(assertions));
    }
}