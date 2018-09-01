import { Address } from "./ethereum-address";

export enum VoteStatus {
    Pending = 0,
    Accept = 1,
    Reject = 2
}

export interface CandidateVotes {
    candidate: Address;
    votes: Map<Address, VoteStatus>;
}