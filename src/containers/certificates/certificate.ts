import * as React from 'react';
import CertificateLister, { CertificateListerProps, CertificateListerDispatch} from '../../components/certificates/certificate-lister';
import { State as CertificateListerState } from '../../state/certificate-lister';
import { connect } from 'react-redux';
import { State as RootState } from '../../state/root';
import { ThunkDispatch } from 'redux-thunk';
import { Address } from '../../types/ethereum-address';
import { Actions, requestRevocation } from '../../actions/certificate-assignment-actions';
import Certificate, { CertificateProps, CertificateDispatch, CertificateOwnProps } from '../../components/certificates/certificate';
import { Assertion } from '../../types/assertion';

const mapDispatchToProps = (dispatch: ThunkDispatch<CertificateProps, undefined, Actions>): CertificateDispatch => ({
    revoke: (assertion: Assertion, holder: Address) => dispatch(requestRevocation(holder, assertion))
})

const mapStateToProps = (state: RootState, ownProps: CertificateOwnProps): CertificateProps => {
    return {
        account: state.account.account,
        ...ownProps
    }
}

export default connect<CertificateProps, CertificateDispatch, CertificateOwnProps, RootState>(
    mapStateToProps, 
    mapDispatchToProps
)(Certificate);

