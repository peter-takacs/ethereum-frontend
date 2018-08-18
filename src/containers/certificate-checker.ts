import { connect } from 'react-redux';
import CertificateChecker, { CertificateCheckerDispatch } from '../components/certificate-checker';
import { getStatus, changeQuery, Actions } from '../actions/certificate-holder-actions';
import { State } from '../state/root';
import { State as CertificateCheckerState} from '../state/certificate-checker';
import { ThunkDispatch } from 'redux-thunk';

const mapDispatchToProps = (dispatch: ThunkDispatch<CertificateCheckerState, undefined, Actions>) => ({
    onClick: (candidate: string, certificate: string) => dispatch(getStatus(candidate, parseInt(certificate))),
    onCandidateChange: (candidate: string) => dispatch(changeQuery({candidate})),
    onCertificateChange: (certificate: string) => dispatch(changeQuery({certificate})),
})

const mapStateToProps = (state: State) => {
    return {
        candidate: state.certificateChecker.candidate,
        hasCertificate: state.certificateChecker.hasCertificate,
        certificate: state.certificateChecker.certificate
    }
}
export default connect<CertificateCheckerState, CertificateCheckerDispatch>(mapStateToProps, mapDispatchToProps)(CertificateChecker);