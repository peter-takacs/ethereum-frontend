import { connect } from 'react-redux';
const EducatorNetworkContract = require('../../build/contracts/EducatorNetwork.json');
const CertificatesContract = require('../../build/contracts/Certificates.json');
import getWeb3 from '../utils/getWeb3'
import contract from 'truffle-contract';
import { ThunkAction } from 'redux-thunk';
import { State } from '../state/educator-network';

export const REQUEST_MEMBERS = 'REQUEST_MEMBERS';
export type REQUEST_MEMBERS = typeof REQUEST_MEMBERS;
export interface RequestMembers {
    type: REQUEST_MEMBERS
}

function requestMembers(): Actions {
    return {
        type:  REQUEST_MEMBERS
    };
}

export const RECEIVE_MEMBERS = 'RECEIVE_MEMBERS';
export type RECEIVE_MEMBERS = typeof RECEIVE_MEMBERS;
export interface ReceiveMembers {
    type: RECEIVE_MEMBERS,
    members: string[]
}
function receiveMembers(members: string[]): Actions {
    return {
        type: RECEIVE_MEMBERS,
        members: members
    }
}

export type Actions = ReceiveMembers | RequestMembers;

export function getMembers(): ThunkAction<void, State, undefined, Actions> {
    return function (dispatch) {
        dispatch(requestMembers());

        return getWeb3
        .then((results: any) => {
            const web3 = results.web3;
            const educatorNetwork = contract(EducatorNetworkContract);
            educatorNetwork.setProvider(web3.currentProvider);

            return web3.eth.getAccounts(() => {
                educatorNetwork.deployed().then((instance: any) => {
                    return instance.getMembers.call()
                })
                .then((result: string[]) => {
                    dispatch(receiveMembers(result));
                })
            });
        });
    }
}