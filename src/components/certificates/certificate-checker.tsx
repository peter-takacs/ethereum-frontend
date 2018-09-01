import * as React from 'react';
import { CertificateCheckerState, CertificateCheckState } from '../../state/certificate-checker';
import { Input, FormControl, Button, TextField, Grid } from '@material-ui/core';
import AddressEditor from '../common/address-editor';
import { Address } from '../../types/ethereum-address';

export interface CertificateCheckerDispatch {
    onClick: (candidate: Address, certificate: string) => void;
}

export type CertificateCheckerProps = CertificateCheckerState & CertificateCheckerDispatch;

interface State {
    candidate: Address | null;
    certificate: string;
}

export class CertificateChecker extends React.Component<CertificateCheckerProps, State> {

    private candidateChange(candidate: Address) {
        this.setState({
            candidate
        })
    }
    private certificateChange(certificate: string) {
        this.setState({
            certificate
        })
    }

    private get isValid(): boolean {
        if (this.state.candidate == null || this.state.certificate == null) {
            return false;
        }
        return true;
    }

    private onSubmitClicked() {
        if (this.isValid) {
            this.props.onClick(this.state.candidate!, this.state.certificate);
        }
    }

    private get resultText() {
        switch (this.props.certificateStatus) {
            case CertificateCheckState.Checking:
                return 'Loading...';
            case CertificateCheckState.Confirmed:
                return 'The given address has the certificate';
            case CertificateCheckState.Rejected:
                return 'The given addres does not have the certificate';
            default:
                return '';
        }        
    }

    constructor(props: CertificateCheckerProps) {
        super(props);
        this.state = {
            candidate: null,
            certificate: ''
        }
    }

    render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs>
                    <FormControl>
                        <AddressEditor
                            placeholder="Candidate address"
                            address={this.state.candidate}
                            onChange={(c) => c && this.candidateChange(c)}
                        />
                        <TextField 
                            id="certificate" 
                            placeholder="Certificate to check" 
                            value={this.state.certificate} 
                            onChange={(c) =>  this.certificateChange(c.target.value)} 
                        />
                        <Button 
                            onClick={() => this.onSubmitClicked()}
                            disabled={!this.isValid}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs>
                    {this.resultText}
                </Grid>
            </Grid>
        );
    }
}

export default CertificateChecker;