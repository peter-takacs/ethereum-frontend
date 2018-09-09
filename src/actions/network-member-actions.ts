const EducatorNetworkContract = require('../../build/contracts/EducatorNetwork.json');
import getWeb3 from '../utils/getWeb3'
import * as contract from 'truffle-contract';
import { ThunkAction } from 'redux-thunk';
import { NetworkMembersState } from '../state/educator-network';
import { Address } from '../types/ethereum-address';
import { NetworkMemberAdditionState } from '../state/network-member-addition';

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
    members: Address[]
}
function receiveMembers(members: Address[]): Actions {
    return {
        type: RECEIVE_MEMBERS,
        members: members
    }
}

const REQUEST_ADDITION = 'REQUEST_ADDITION';
export type REQUEST_ADDITION = typeof REQUEST_ADDITION;
interface RequestAddition {
    type: REQUEST_ADDITION;
    member: Address;
}

type AcceptAddition = RequestAddition;

const REJECT_ADDITON = 'REJECT_ADDITION';
export type REJECT_ADDITION = typeof REJECT_ADDITON;
interface RejectAddition {
    type: REJECT_ADDITION;
    member: Address;
}

export type Actions = ReceiveMembers | RequestMembers | RequestAddition | AcceptAddition | RejectAddition;

export function getMembers(): ThunkAction<void, NetworkMembersState, undefined, Actions> {
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
                    dispatch(receiveMembers(result.map(s => new Address(s))));
                })
            });
        });
    }
}

export function acceptAddition(member: Address) : ThunkAction<void, NetworkMemberAdditionState, undefined, Actions> {
    return requestAddition(member);
}

export function rejectAddition(member: Address) : ThunkAction<void, NetworkMemberAdditionState, undefined, Actions> {
    return function(dispatch) {
        // TODO implement
        dispatch(getMembers() as any);
    }
}

export function requestAddition(member: Address) : ThunkAction<void, NetworkMemberAdditionState, undefined, Actions> {
    return function (dispatch) {
        return getWeb3.then(async ({web3}: any) => {
            const accounts = await web3.eth.getAccounts();
            const currentAccount: Address = new Address(accounts[0]);

            web3.personal.unlockAccount(currentAccount, () => {
                const educatorNetwork = contract(EducatorNetworkContract);
                educatorNetwork.setProvider(web3.currentProvider);

                return web3.eth.getAccounts((_: any, ) => {
                    educatorNetwork.deployed().then((instance: any) => {
                        return instance.requestAddition(member.toString(), { from: currentAccount, gas: 500000 })
                    })
                    .then(() => {
                        dispatch(getMembers() as any); //TODO
                    })
                })
            });
       })
    }
}