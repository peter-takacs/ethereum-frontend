import { Address } from '../types/ethereum-address';

export enum CertificateQueryState {
    Idle,
    Loading,
    Assigned,
    NotAssigned
}

export interface CertificateAdderState {
    state: CertificateQueryState
}