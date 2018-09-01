import { connect } from 'react-redux';
import CertificateChecker, { CertificateCheckerDispatch } from '../components/certificates/certificate-checker';
import { getStatus, Actions } from '../actions/certificate-holder-actions';
import { State as RootState } from '../state/root';
import { CertificateCheckerState } from '../state/certificate-checker';
import { ThunkDispatch } from 'redux-thunk';
import { Address } from '../types/ethereum-address';

const mapDispatchToProps = (dispatch: ThunkDispatch<CertificateCheckerState, undefined, Actions>) => ({
    onClick: (candidate: Address, certificate: string) => dispatch(getStatus({candidate, certificate})),
})

const mapStateToProps = (state: RootState): CertificateCheckerState => {
    return {
        certificateStatus: state.certificateChecker.certificateStatus,
    }
}
export default connect<CertificateCheckerState, CertificateCheckerDispatch, {}, RootState>(
    mapStateToProps, 
    mapDispatchToProps
)(CertificateChecker);