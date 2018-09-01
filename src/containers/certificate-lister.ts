import * as React from 'react';
import CertificateLister, { CertificateListerProps, CertificateListerDispatch} from '../components/certificates/certificate-lister';
import { State as CertificateListerState } from '../state/certificate-lister';
import { connect } from 'react-redux';
import { State as RootState } from '../state/root';
import { ThunkDispatch } from 'redux-thunk';
import { Actions, getAssertions, changeQuery } from '../actions/certificate-lister-actions';
import { Address } from '../types/ethereum-address';

const mapDispatchToProps = (dispatch: ThunkDispatch<CertificateListerState, undefined, Actions>) => ({
    onSubmit: (candidate: Address) => dispatch(getAssertions(candidate)),
    onCandidateChange: (candidate: Address) => dispatch(changeQuery(candidate)),
})

const mapStateToProps = (state: RootState): CertificateListerState => {
    return {
        candidate: state.certificateLister.candidate,
        results: state.certificateLister.results,
        status: state.certificateLister.status
    }
}

export default connect<CertificateListerState, CertificateListerDispatch, {}, RootState>(
    mapStateToProps, 
    mapDispatchToProps
)(CertificateLister);

