
import CertificatesContract from '../../build/contracts/Certificates.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract';

export const REQUEST_STATUS = 'REQUEST_STATUS';
function requestStatus(candidate, certificate) {
    return {
        type: REQUEST_STATUS,
        candidate,
        certificate
    };
}

export const RECEIVE_STATUS = 'RECEIVE_STATUS';
function receiveStatus(hasCertificate) {
    return {
        type: RECEIVE_STATUS,
        hasCertificate  
    }
}

export const CHANGE_STATUS_QUERY = 'CHANGE_STATUS_QUERY';
export function changeQuery(candidate, certificate) {
    return {
        type: CHANGE_STATUS_QUERY,
        candidate,
        certificate
    }
}

export function getStatus(candidate, certificate) {
    return function (dispatch) {
        dispatch(requestStatus(candidate, certificate));

        return getWeb3
        .then(results => {
            const web3 = results.web3;

            const certificates = contract(CertificatesContract)
            certificates.setProvider(web3.currentProvider);
            return web3.eth.getAccounts((error, accounts) => {
                certificates.deployed().then((instance) => {
                    return instance.getCertificates.call(candidate)
                })
                .then(result => {
                    dispatch(receiveStatus(result.includes(certificate)));
                })
            });
        });
    }
}