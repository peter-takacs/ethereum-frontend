
import {
    REQUEST_SENT,
    CHANGE_ASSIGNMENT_QUERY,
    Actions
} from '../actions/certificate-assignment-actions';

const certificateAssignment = (state = {candidate: '', status: '', certificate: ''}, action: Actions) => {
    switch (action.type) {
        case CHANGE_ASSIGNMENT_QUERY:
            return {
                ...state,
                candidate: action.query.candidate == null 
                            ? state.candidate 
                            : action.query.candidate,
                certificate: action.query.certificate == null 
                            ? state.certificate 
                            : action.query.certificate,
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