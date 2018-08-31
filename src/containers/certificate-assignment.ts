import CertificateAdder, { CertificateAssignmentDispatch } from '../components/certificate-assignment';
import { requestAddition } from '../actions/certificate-assignment-actions';
import { connect } from 'react-redux';
import { State as RootState } from '../state/root';
import { CertificateAdderState as CertificateAssignmentState} from '../state/certificate-assignment';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../actions/certificate-assignment-actions';
import { Address } from '../types/ethereum-address';

const mapDispatchToProps = (dispatch: ThunkDispatch<CertificateAssignmentState, undefined, Actions>) => ({
    onClick: (candidate: Address, certificate: string) => dispatch(requestAddition(candidate, certificate)),
})

const mapStateToProps = (state: RootState) => {
    return {
        state: state.certificateAssignment.state
    }
}
export default connect<CertificateAssignmentState, CertificateAssignmentDispatch, {}, RootState>(
    mapStateToProps, 
    mapDispatchToProps)
(CertificateAdder);