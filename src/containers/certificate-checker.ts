import { connect } from 'react-redux';
import CertificateChecker, { CertificateCheckerDispatch } from '../components/certificate-checker';
import { getStatus, changeQuery, Actions } from '../actions/certificate-holder-actions';
import { State as RootState } from '../state/root';
import { State as CertificateCheckerState} from '../state/certificate-checker';
import { ThunkDispatch } from 'redux-thunk';
import { Address } from '../types/ethereum-address';

const mapDispatchToProps = (dispatch: ThunkDispatch<CertificateCheckerState, undefined, Actions>) => ({
    onClick: (candidate: Address, certificate: string) => dispatch(getStatus({candidate, certificate})),
    onCandidateChange: (candidate: Address) => dispatch(changeQuery({candidate})),
    onCertificateChange: (certificate: string) => dispatch(changeQuery({certificate})),
})

const mapStateToProps = (state: RootState): CertificateCheckerState => {
    return {
        candidate: state.certificateChecker.candidate,
        certificateStatus: state.certificateChecker.certificateStatus,
        certificate: state.certificateChecker.certificate
    }
}
export default connect<CertificateCheckerState, CertificateCheckerDispatch, {}, RootState>(
    mapStateToProps, 
    mapDispatchToProps
)(CertificateChecker);