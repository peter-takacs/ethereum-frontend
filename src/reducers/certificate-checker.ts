
import { Actions, RECEIVE_STATUS, CHANGE_STATUS_QUERY } from '../actions/certificate-holder-actions';
import { State } from '../state/certificate-checker';

const certificateChecker = (state: State = {candidate: '', hasCertificate: false, certificate: ''}, action: Actions) => {
    switch (action.type) {
        case RECEIVE_STATUS:
            return {
                ...state,
                hasCertificate: action.hasCertificate 
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