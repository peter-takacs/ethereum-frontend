import getWeb3 from "../utils/getWeb3";
import CertificatesContract from '../../build/contracts/Certificates.json';
import contract from 'truffle-contract';

export const REQUEST_ADDITION = 'REQUEST_ADDITION';
function createRequestAddition(candidate, certificate) {
    return {
        type: REQUEST_ADDITION,
        candidate,
        certificate
    }
}

export const REQUEST_SENT = 'REQUEST_SENT';
function requestSent() {
    return {
        type: REQUEST_SENT
    }
}

export const CHANGE_ASSIGNMENT_QUERY = 'CHANGE_ASSIGNMENT_QUERY';
export function changeQuery(candidate, certificate) {
    return {
        type: CHANGE_ASSIGNMENT_QUERY,
        candidate,
        certificate
    }
}



export function requestAddition(candidate, certificate) {
    const TODOaccount = "0xe19D07c1f95fc69103aDbAA13bC2CdDfB6c661DD";
    
    return function(dispatch) {
        dispatch(createRequestAddition());

        return getWeb3.then(
            ({web3}) => {
                const certificates = contract(CertificatesContract);
                certificates.setProvider(web3.currentProvider);
                
                web3.personal.unlockAccount(TODOaccount);

                return web3.eth.getAccounts((_, accounts) => {
                    certificates.deployed().then(instance => {
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