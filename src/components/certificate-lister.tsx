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
    
    private static isValid(props: CertificateListerProps) {
        return props.candidate != null;
    }

    private candidateChange(candidate: Address) {
        this.props.onCandidateChange(candidate);
    }

    private submitClicked() {
        if (CertificateLister.isValid(this.props)) {
            this.props.onSubmit(this.props.candidate!);
        }
    }
    
    constructor(props: CertificateListerProps) {
        super(props);
    }
    
    public render(): JSX.Element {
        return (
            <Grid container spacing={24}>
                <Grid item xs>
                    <FormControl>
                        <AddressEditor
                            placeholder="Candidate address"
                            address={this.props.candidate}
                            onChange={(c) => c && this.candidateChange(c)}
                        />
                        <Button 
                            disabled={!CertificateLister.isValid(this.props)}
                            onClick={() => this.submitClicked()}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs>
                    <ul>
                        {this.props.results.map(assertion => {
                            return (
                                <li key={assertion.certificate}>
                                    {assertion.certificate} 
                                    (issued by: {assertion.issuer.toString()})
                                </li>
                            )
                        })}
                    </ul>
                </Grid>
            </Grid>
        );
    }
}

export default CertificateLister;