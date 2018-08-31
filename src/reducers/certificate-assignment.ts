
import {
    REQUEST_SENT,
    Actions
} from '../actions/certificate-assignment-actions';
import { CertificateAdderState, CertificateQueryState } from '../state/certificate-assignment';

const defaultState: CertificateAdderState = {
    state: CertificateQueryState.Idle
}

const certificateAssignment = (state: CertificateAdderState = defaultState, action: Actions): CertificateAdderState => {
    switch (action.type) {
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