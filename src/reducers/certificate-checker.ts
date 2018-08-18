
import { Actions, RECEIVE_STATUS, CHANGE_STATUS_QUERY, REQUEST_STATUS } from '../actions/certificate-holder-actions';
import { State, CertificateCheckState } from '../state/certificate-checker';
const defaultState = {candidate: '', certificateStatus: CertificateCheckState.Idle, certificate: ''};
const certificateChecker = (state: State = defaultState, action: Actions): State => {
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
       case CHANGE_STATUS_QUERY:
            return {
                ...state,
                candidate: action.query.candidate == null 
                    ? state.candidate
                    : action.query.candidate,
                certificate: action.query.certificate == null
                    ? state.certificate
                    : action.query.certificate
            }
        default:
            return state;
    }
}

export default certificateChecker;