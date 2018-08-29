import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AddressEditor from './address-editor';
import { Button, Grid, FormControl } from '@material-ui/core';
import { State } from '../state/certificate-lister';
import { Address } from '../types/ethereum-address';

export interface CertificateListerDispatch {
    onCandidateChange: (candidate: Address) => void;
    onSubmit: (candidate: Address) => void;
}

export type CertificateListerProps = CertificateListerDispatch & State;

const CertificateLister = ({candidate, state, results, onCandidateChange, onSubmit}: CertificateListerProps) => {
    const candidateChange = onCandidateChange;
    const submitClicked = () => onSubmit(candidate);
    
    return (
        <Grid container spacing={24}>
            <Grid item xs>
                <FormControl>
                    <AddressEditor
                        placeholder="Candidate address"
                        address={candidate}
                        onChange={candidateChange}
                    />
                    <Button onClick={submitClicked}>Submit</Button>
                </FormControl>
            </Grid>
            <Grid item xs>
                Result
            </Grid>
        </Grid>
    );
}

export default CertificateLister;