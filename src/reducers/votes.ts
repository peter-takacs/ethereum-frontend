import { VotesState } from "../state/votes";
import { Actions, RECEIVE_CANDIDATES, RECEIVE_VOTES } from "../actions/vote-actions";
import { Address } from '../types/ethereum-address';
import { CandidateVotes } from "../types/vote";

const votes = (state: VotesState = {candidates: [], votes: new Map<Address, CandidateVotes>()}, action: Actions) => {
    switch (action.type) {
        case RECEIVE_CANDIDATES:
            return {
                ...state,
                candidates: action.candidates
            };
        case RECEIVE_VOTES:
        {
            let currentVotes = state.votes;
            let modifiedVotes = new Map(currentVotes);
            modifiedVotes.set(action.votes.candidate, action.votes);
            return {
                ...state,
                votes: modifiedVotes
            }
        }
        default:
            return state;
    }
}

export default votes;