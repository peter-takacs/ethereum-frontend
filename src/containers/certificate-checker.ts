import { connect } from 'react-redux';
import CertificateChecker, { CertificateCheckerDispatch } from '../components/certificate-checker';
import { getStatus, changeQuery, Actions } from '../actions/certificate-holder-actions';
import { State as RootState } from '../state/root';
import { State as CertificateCheckerState} from '../state/certificate-checker';
import { ThunkDispatch } from 'redux-thunk';

const mapDispatchToProps = (dispatch: ThunkDispatch<CertificateCheckerState, undefined, Actions>) => ({
    onClick: (candidate: string, certificate: string) => dispatch(getStatus({candidate, certificate})),
    onCandidateChange: (candidate: string) => dispatch(changeQuery({candidate})),
    onCertificateChange: (certificate: string) => dispatch(changeQuery({certificate})),
})

const mapStateToProps = (state: RootState): CertificateCheckerState => {
    return {
        candidate: state.certificateChecker.candidate,
        certificateStatus: state.certificateChecker.certificateStatus,
        certificate: state.certificateChecker.certificate
    }
}
export default connect<CertificateCheckerState, CertificateCheckerDispatch, {}, RootState>(mapStateToProps, mapDispatchToProps)(CertificateChecker);