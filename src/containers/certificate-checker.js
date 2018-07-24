import { connect } from 'react-redux';
import CertificateChecker from '../components/certificate-checker';
import { getStatus, changeQuery } from '../actions/certificate-holder-actions';

const mapDispatchToProps = dispatch => ({
    onClick: (candidate, certificate) => dispatch(getStatus(candidate, certificate)),
    onChange: (candidate, certificate) => dispatch(changeQuery(candidate, certificate))
})

const mapStateToProps = (state) => {
    return {
        candidate: state.certificateChecker.candidate,
        hasCertificate: state.certificateChecker.hasCertificate,
        certificate: state.certificateChecker.certificate
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CertificateChecker);