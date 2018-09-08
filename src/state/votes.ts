import { Address } from "../types/ethereum-address";
import { CandidateVotes } from "../types/vote";

export interface VotesState {
    candidates: Address[],
    votes: Map<Address, CandidateVotes>;
}