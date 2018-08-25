import { Address } from "../types/ethereum-address";

export enum CertificateCheckState {
    Idle,
    Checking,
    Confirmed,
    Rejected
}
export interface State {
    candidate: Address | null,
    certificate: string,
    certificateStatus: CertificateCheckState
}