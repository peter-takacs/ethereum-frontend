const EducatorNetworkContract = require('../../build/contracts/EducatorNetwork.json');
import getWeb3 from '../utils/getWeb3'
import * as contract from 'truffle-contract';
import { Address } from "../types/ethereum-address";
import { CandidateVotes, VoteStatus } from "../types/vote";
import { ThunkAction } from "redux-thunk";
import { getContractEnvironment } from '../utils/contract-api';

export const REQUEST_CANDIDATES = 'REQUEST_CANDIDATES';
export type REQUEST_CANDIDATES = typeof REQUEST_CANDIDATES;

export interface RequestCandidates {
    type: REQUEST_CANDIDATES
}

export function requestCandidates(): ThunkAction<void, {}, undefined, Actions> {
    return async function (dispatch) {

        const { educatorNetwork, web3, currentAccount } = await getContractEnvironment();
        dispatch({
            type: REQUEST_CANDIDATES,
        });

        const response: any[] = await educatorNetwork.getCandidates.call();

        dispatch(receiveCandidates(response.map(r => new Address(r))));
        response.forEach(r => {
            dispatch(requestVotes(new Address(r)))
        })
    }
}

export const RECEIVE_CANDIDATES = 'RECEIVE_CANDIDATES';
export type RECEIVE_CANDIDATES = typeof RECEIVE_CANDIDATES;

export interface ReceiveCandidates {
    type: RECEIVE_CANDIDATES,
    candidates: Address[]
}

export function receiveCandidates(candidates: Address[]): Actions {
    return {
        type: RECEIVE_CANDIDATES,
        candidates
    };
}

export const REQUEST_VOTES = 'REQUEST_VOTES';
export type REQUEST_VOTES = typeof REQUEST_VOTES;

export interface RequestVotes {
    type: REQUEST_VOTES,
    candidate: Address
}

export function requestVotes(candidate: Address): ThunkAction<void, {}, undefined, Actions> {
    return async function (dispatch) {
        dispatch({
            type: REQUEST_VOTES,
            candidate
        });
        const { educatorNetwork, web3, currentAccount } = await getContractEnvironment();
        const response: any[][] = await educatorNetwork.getVotesForCandidate.call(candidate.toString());
        let votes = new Map<Address, VoteStatus>();
        for (let i = 0; i < response[0].length; i++) {
            votes.set(
                new Address(response[0][i]),
                response[1][i].toNumber()
            );
        }
        dispatch(receiveVotes({
            candidate,
            votes
        }));
    }
}

export const RECEIVE_VOTES = 'RECEIVE_VOTES';
export type RECEIVE_VOTES = typeof RECEIVE_VOTES;

export interface ReceiveVotes {
    type: RECEIVE_VOTES,
    votes: CandidateVotes
}

export function receiveVotes(votes: CandidateVotes): Actions {
    return {
        type: RECEIVE_VOTES,
        votes
    };
}

export type Actions = RequestCandidates | RequestVotes | ReceiveCandidates | ReceiveVotes;