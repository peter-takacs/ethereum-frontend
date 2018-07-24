import EducatorNetworkContract from '../../build/contracts/EducatorNetwork.json'
import CertificatesContract from '../../build/contracts/Certificates.json'
import getWeb3 from '../utils/getWeb3'

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

        const contract = require('truffle-contract')
        return getWeb3
        .then(results => {
            const web3 = results.web3;

            const educatorNetwork = contract(EducatorNetworkContract);
            edutcatorNetwork.setProvider(web3.currentProvider);
            var educatorNetworkInstance

            return web3.eth.getAccounts((error, accounts) => {
                educatorNetwork.deployed().then((instance) => {
                    educatorNetworkInstance = instance

                    return educatorNetworkInstance.getMembers.call()
                })
                .then(result => {
                    dispatch(receiveMembers(result));
                })
            });
        });
    }
}