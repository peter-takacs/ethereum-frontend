const EducatorNetworkContract = require('../../build/contracts/EducatorNetwork.json');
import getWeb3 from '../utils/getWeb3'
import * as contract from 'truffle-contract';
import { ThunkAction } from 'redux-thunk';
import { NetworkMembersState } from '../state/educator-network';
import { Address } from '../types/ethereum-address';
import { NetworkMemberAdditionState } from '../state/network-member-addition';
import { getContractEnvironment } from '../utils/contract-api';

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
    return async function (dispatch) {
        dispatch(requestMembers());
        const { educatorNetwork, web3, currentAccount } = await getContractEnvironment();

        const result: string[] = await educatorNetwork.getMembers.call();

        dispatch(receiveMembers(result.map(s => new Address(s))));
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
    return async function (dispatch) {
        const { educatorNetwork, web3, currentAccount } = await getContractEnvironment();
        await web3.eth.personal.unlockAccount(currentAccount.toString());
        await educatorNetwork.requestAddition(member.toString(), { from: currentAccount.toString(), gas: 500000 });
        dispatch(getMembers() as any);
    }
}