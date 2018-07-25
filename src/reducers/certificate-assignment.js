
import {
    REQUEST_SENT,
    CHANGE_ASSIGNMENT_QUERY
} from '../actions/certificate-assignment-actions';

const certificateAssignment = (state = {candidate: '', status: '', certificate: ''}, action) => {
    switch (action.type) {
        case CHANGE_ASSIGNMENT_QUERY:
            return {
                ...state,
                candidate: action.candidate,
                certificate: action.certificate
            }
        case REQUEST_SENT:
            return {
                ...state,
                status: 'DONE'
            }
        default:
            return state;
    }
}

export default certificateAssignment;