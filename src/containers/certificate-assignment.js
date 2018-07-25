import { connect } from 'react-redux';
import CertificateAdder from '../components/certificate-assignment';
import { requestAddition, changeQuery } from '../actions/certificate-assignment-actions';

const mapDispatchToProps = dispatch => ({
    onClick: (candidate, certificate) => dispatch(requestAddition(candidate, certificate)),
    onChange: (candidate, certificate) => dispatch(changeQuery(candidate, certificate))
})

const mapStateToProps = (state) => {
    return {
        candidate: state.certificateAssignment.candidate,
        certificate: state.certificateAssignment.certificate,
        status: state.certificateAssignment.status
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CertificateAdder);