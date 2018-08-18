import CertificateAdder, { CertificateAssignmentDispatch } from '../components/certificate-assignment';
import { requestAddition, changeQuery } from '../actions/certificate-assignment-actions';
import { connect } from 'react-redux';
import { State as RootState } from '../state/root';
import { State as CertificateAssignmentState} from '../state/certificate-assignment';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../actions/certificate-assignment-actions';
import { sha256 } from '../../node_modules/js-sha256';

const mapDispatchToProps = (dispatch: ThunkDispatch<CertificateAssignmentState, undefined, Actions>) => ({
    onClick: (candidate: string, certificate: string) => dispatch(requestAddition(candidate, certificate)),
    onCandidateChange: (candidate: string) => dispatch(changeQuery({candidate})),
    onCertificateChange: (certificate: string) => dispatch(changeQuery({certificate}))
})

const mapStateToProps = (state: RootState) => {
    return {
        candidate: state.certificateAssignment.candidate,
        certificate: state.certificateAssignment.certificate,
        state: state.certificateAssignment.state
    }
}
export default connect<CertificateAssignmentState, CertificateAssignmentDispatch>(mapStateToProps, mapDispatchToProps)(CertificateAdder);