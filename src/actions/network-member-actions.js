import EducatorNetworkContract from '../../build/contracts/EducatorNetwork.json'
import CertificatesContract from '../../build/contracts/Certificates.json'
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract';

export const REQUEST_MEMBERS = 'REQUEST_MEMBERS';
function requestMembers() {
    return {
        type: REQUEST_MEMBERS
    };
}

export const RECEIVE_MEMBERS = 'RECEIVE_MEMBERS';
function receiveMembers(members) {
    return {
        type: RECEIVE_MEMBERS,
        members: members
    }
}

export function getMembers() {
    return function (dispatch) {
        dispatch(requestMembers());

        return getWeb3
        .then(results => {
            const web3 = results.web3;
            const educatorNetwork = contract(EducatorNetworkContract);
            educatorNetwork.setProvider(web3.currentProvider);

            return web3.eth.getAccounts((error, accounts) => {
                educatorNetwork.deployed().then((instance) => {
                    return instance.getMembers.call()
                })
                .then(result => {
                    dispatch(receiveMembers(result));
                })
            });
        });
    }
}