import * as React from 'react';
import AddressEditor from '../common/address-editor';
import { Button, Grid, FormControl, Card, CardContent, Typography } from '@material-ui/core';
import { State } from '../../state/certificate-lister';
import { Address } from '../../types/ethereum-address';
import Certificate from '../../containers/certificates/certificate';

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
                    { this.props.candidate != null
                        ? this.props.results.map(assertion => {
                            return (
                               <Certificate
                                    key={assertion.certificate.toString()}
                                    assertion={assertion}
                                    holder={this.props.candidate!}
                                />
                            )})
                        : (<div/>)
                    }
                </Grid>
            </Grid>
        );
    }
}

export default CertificateLister;