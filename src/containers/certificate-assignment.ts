import CertificateAdder, { CertificateAssignmentDispatch } from '../components/certificate-assignment';
import { requestAddition, changeQuery } from '../actions/certificate-assignment-actions';
import { connect } from 'react-redux';
import { State as RootState } from '../state/root';
import { State as CertificateAssignmentState} from '../state/certificate-assignment';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../actions/certificate-assignment-actions';
import { Address } from '../types/ethereum-address';

const mapDispatchToProps = (dispatch: ThunkDispatch<CertificateAssignmentState, undefined, Actions>) => ({
    onClick: (candidate: Address, certificate: string) => dispatch(requestAddition(candidate, certificate)),
    onCandidateChange: (candidate: Address) => dispatch(changeQuery({candidate})),
    onCertificateChange: (certificate: string) => dispatch(changeQuery({certificate}))
})

const mapStateToProps = (state: RootState) => {
    return {
        candidate: state.certificateAssignment.candidate,
        certificate: state.certificateAssignment.certificate,
        state: state.certificateAssignment.state
    }
}
export default connect<CertificateAssignmentState, CertificateAssignmentDispatch, {}, RootState>(
    mapStateToProps, 
    mapDispatchToProps)
(CertificateAdder);