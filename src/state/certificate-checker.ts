import { Address } from "../types/ethereum-address";

export enum CertificateCheckState {
    Idle,
    Checking,
    Confirmed,
    Rejected
}
export interface CertificateCheckerState {
    certificateStatus: CertificateCheckState
}