
import {
    RECEIVE_STATUS,
    REQUEST_STATUS
} from '../actions';
import { CHANGE_QUERY } from '../actions/certificate-holder-actions';

const certificateChecker = (state = {candidate: '', hasCertificate: false, certificate: ''}, action) => {
    switch (action.type) {
        case RECEIVE_STATUS:
            return {
                ...state,
                hasCertificate: action.hasCertificate 
            }
        case REQUEST_STATUS:
            return {
                ...state,
                candidate: action.candidate,
                certificate: action.certificate
            }
        case CHANGE_QUERY:
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