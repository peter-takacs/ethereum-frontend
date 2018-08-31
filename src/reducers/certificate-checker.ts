
import { Actions, RECEIVE_STATUS, REQUEST_STATUS } from '../actions/certificate-holder-actions';
import { CertificateCheckerState, CertificateCheckState } from '../state/certificate-checker';
const defaultState = {candidate: null, certificateStatus: CertificateCheckState.Idle, certificate: ''};
const certificateChecker = (state: CertificateCheckerState = defaultState, action: Actions): CertificateCheckerState => {
    switch (action.type) {
        case REQUEST_STATUS:
            return {
                ...state,
                certificateStatus: CertificateCheckState.Checking
            }
        case RECEIVE_STATUS:
            return {
                ...state,
                certificateStatus: action.hasCertificate
                    ? CertificateCheckState.Confirmed
                    : CertificateCheckState.Rejected
            }
       default:
            return state;
    }
}

export default certificateChecker;