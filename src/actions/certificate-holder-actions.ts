
const CertificatesContract = require('../../build/contracts/Certificates.json');
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract';
import { ThunkAction } from '../../node_modules/redux-thunk';
import { State } from '../state/certificate-checker';

export const REQUEST_STATUS = 'REQUEST_STATUS';
export type REQUEST_STATUS = typeof REQUEST_STATUS;
export interface RequestStatus {
    type: REQUEST_STATUS,
    candidate: string,
    certificate: number
}
function requestStatus(candidate: string, certificate: number): Actions {
    return {
        type: REQUEST_STATUS,
        candidate,
        certificate
    };
}

export const RECEIVE_STATUS = 'RECEIVE_STATUS';
export type RECEIVE_STATUS = typeof RECEIVE_STATUS;
export interface ReceiveStatus {
    type: RECEIVE_STATUS,
    hasCertificate: boolean
}
function receiveStatus(hasCertificate: boolean): Actions {
    return {
        type: RECEIVE_STATUS,
        hasCertificate  
    }
}

export const CHANGE_STATUS_QUERY = 'CHANGE_STATUS_QUERY';
export type CHANGE_STATUS_QUERY = typeof CHANGE_STATUS_QUERY;
export interface ChangeQuery {
    type: CHANGE_STATUS_QUERY,
    candidate: string,
    certificate: string
}
export function changeQuery(candidate: string, certificate: string): Actions {
    return {
        type: CHANGE_STATUS_QUERY,
        candidate,
        certificate
    }
}

export type Actions = ReceiveStatus | RequestStatus | ChangeQuery; 

export function getStatus(candidate: string, certificate: number): ThunkAction<void, State, undefined, Actions> {
    return function (dispatch) {
        dispatch(requestStatus(candidate, certificate));

        return getWeb3
        .then((results: any) => {
            const web3 = results.web3;

            const certificates = contract(CertificatesContract)
            certificates.setProvider(web3.currentProvider);
            return web3.eth.getAccounts(() => {
                certificates.deployed().then((instance: any) => {
                    return instance.getCertificates.call(candidate)
                })
                .then((result: number[]) => {
                    dispatch(receiveStatus(result.includes(certificate)));
                })
            });
        });
    }
}