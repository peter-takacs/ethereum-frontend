import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AddressEditor from './address-editor';
import { Button, Grid, FormControl } from '@material-ui/core';
import { State } from '../state/certificate-lister';
import { Address } from '../types/ethereum-address';
import { Assertion } from '../types/assertion';
import { EthereumOperationState } from '../state/ethereum-operation-state';

export interface CertificateListerDispatch {
    onCandidateChange: (candidate: Address) => void;
    onSubmit: (candidate: Address) => void;
}

export type CertificateListerProps = CertificateListerDispatch & State;

class CertificateLister extends React.Component<CertificateListerProps, State> {
    candidate: Address | null;
    status: EthereumOperationState;
    results: Assertion[];
    onCandidateChange: (candidate: Address) => void;
    onSubmit: (candidate: Address) => void;

    private get isValid() {
        return this.candidate != null;
    }

    private candidateChange(candidate: Address) {
        this.onCandidateChange(candidate);
    }

    private submitClicked() {
        if (this.isValid) {
            this.onSubmit(this.candidate!);
        }
    }
    
    constructor(props: CertificateListerProps) {
        super(props);
        let {candidate, status, results, onCandidateChange, onSubmit} = props;
        this.candidate = candidate;
        this.status = status;
        this.results = results;
        this.onCandidateChange = onCandidateChange;
        this.onSubmit = onSubmit;
    }
    
    public render(): JSX.Element {
        return (
            <Grid container spacing={24}>
                <Grid item xs>
                    <FormControl>
                        <AddressEditor
                            placeholder="Candidate address"
                            address={this.candidate}
                            onChange={this.candidateChange}
                        />
                        <Button 
                            disabled={!this.isValid}
                            onClick={this.submitClicked}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs>
                    Result
            </Grid>
            </Grid>
        );
    }
}

export default CertificateLister;