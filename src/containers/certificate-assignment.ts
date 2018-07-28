import CertificateAdder from '../components/certificate-assignment';
import { requestAddition, changeQuery } from '../actions/certificate-assignment-actions';
import { connect } from 'react-redux';
import { State as RootState } from '../state/root';
import { State as CertificateAssignmentState} from '../state/certificate-assignment';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../actions/certificate-assignment-actions';

const mapDispatchToProps = (dispatch: ThunkDispatch<CertificateAssignmentState, undefined, Actions>) => ({
    onClick: (candidate: string, certificate: string) => dispatch(requestAddition(candidate, parseInt(certificate))),
    onChange: (candidate: string, certificate: string) => dispatch(changeQuery(candidate, certificate))
})

const mapStateToProps = (state: RootState) => {
    return {
        candidate: state.certificateAssignment.candidate,
        certificate: state.certificateAssignment.certificate,
        state: state.certificateAssignment.state
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CertificateAdder);