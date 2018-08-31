
const CertificatesContract = require('../../build/contracts/Certificates.json');
import getWeb3 from '../utils/getWeb3'
import * as contract from 'truffle-contract';
import { ThunkAction } from '../../node_modules/redux-thunk';
import { CertificateCheckerState } from '../state/certificate-checker';
import { CandidateQuery } from '../state/candidate-query';
import { sha256 } from '../../node_modules/js-sha256';

export const REQUEST_STATUS = 'REQUEST_STATUS';
export type REQUEST_STATUS = typeof REQUEST_STATUS;
export interface RequestStatus {
    type: REQUEST_STATUS,
    query: CandidateQuery
}
function requestStatus(query: CandidateQuery): Actions {
    return {
        type: REQUEST_STATUS,
        query
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

export type Actions = ReceiveStatus | RequestStatus; 

export function getStatus(query: CandidateQuery): ThunkAction<void, CertificateCheckerState, undefined, Actions> {
    return function (dispatch) {
        dispatch(requestStatus(query));

        return getWeb3
        .then((results: any) => {
            const web3 = results.web3;

            const certificates = contract(CertificatesContract)
            certificates.setProvider(web3.currentProvider);
            return web3.eth.getAccounts(() => {
                certificates.deployed().then((instance: any) => {
                    if (query.candidate == null) {
                        return;
                    }
                    return instance.getCertificates.call(query.candidate.toString())
                })
                .then((result: number[]) => {
                    const hashedCertificate = sha256(query.certificate || '');
                    const hashNumber = web3.toBigNumber(`0x${hashedCertificate}`)
                    dispatch(receiveStatus(result.some(result => hashNumber.equals(result))));
                })
            });
        });
    }
}