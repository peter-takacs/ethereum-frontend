import { connect } from 'react-redux';
import CertificateChecker from '../components/certificate-checker';
import { getStatus, changeQuery, Actions } from '../actions/certificate-holder-actions';
import { State } from '../state/root';
import { State as CertificateCheckerState} from '../state/certificate-checker';
import { ThunkDispatch } from 'redux-thunk';

const mapDispatchToProps = (dispatch: ThunkDispatch<CertificateCheckerState, undefined, Actions>) => ({
    onClick: (candidate: string, certificate: string) => dispatch(getStatus(candidate, parseInt(certificate))),
    onChange: (candidate: string, certificate: string) => dispatch(changeQuery(candidate, certificate))
})

const mapStateToProps = (state: State) => {
    return {
        candidate: state.certificateChecker.candidate,
        hasCertificate: state.certificateChecker.hasCertificate,
        certificate: state.certificateChecker.certificate
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CertificateChecker);