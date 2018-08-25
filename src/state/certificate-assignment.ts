import { Address } from '../types/ethereum-address';

export enum CertificateQueryState {
    Idle,
    Loading,
    Assigned,
    NotAssigned
}

export interface State {
    candidate: Address | null,
    certificate: string,
    state: CertificateQueryState
}