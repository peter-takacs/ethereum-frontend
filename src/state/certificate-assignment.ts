export enum CertificateQueryState {
    Idle,
    Loading,
    Assigned,
    NotAssigned
}

export interface State {
    candidate: string,
    certificate: string,
    state: CertificateQueryState
}