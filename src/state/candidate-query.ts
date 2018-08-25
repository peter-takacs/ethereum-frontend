import { Address } from "../types/ethereum-address";

export interface CandidateQuery {
    candidate?: Address,
    certificate?: string
}