
import { Actions, RECEIVE_STATUS, CHANGE_STATUS_QUERY } from '../actions/certificate-holder-actions';

const certificateChecker = (state = {candidate: '', hasCertificate: false, certificate: ''}, action: Actions) => {
    switch (action.type) {
        case RECEIVE_STATUS:
            return {
                ...state,
                hasCertificate: action.hasCertificate 
            }
       case CHANGE_STATUS_QUERY:
            return {
                ...state,
                candidate: action.candidate,
                certificate: action.certificate
            }
        default:
            return state;
    }
}

export default certificateChecker;