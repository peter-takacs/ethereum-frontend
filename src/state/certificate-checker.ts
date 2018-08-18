export enum CertificateCheckState {
    Idle,
    Checking,
    Confirmed,
    Rejected
}
export interface State {
    candidate: string,
    certificate: string,
    certificateStatus: CertificateCheckState
}