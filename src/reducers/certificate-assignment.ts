
import {
    REQUEST_SENT,
    CHANGE_ASSIGNMENT_QUERY,
    Actions
} from '../actions/certificate-assignment-actions';
import { State, CertificateQueryState } from '../state/certificate-assignment';

const defaultState: State = {
    candidate: null,
    certificate: '',
    state: CertificateQueryState.Idle
}

const certificateAssignment = (state: State = defaultState, action: Actions): State => {
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
                state: CertificateQueryState.Assigned
            }
        default:
            return state;
    }
}

export default certificateAssignment;