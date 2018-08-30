import * as React from 'react';
import { State, CertificateCheckState } from '../state/certificate-checker';
import { Input, FormControl, Button, TextField, Grid } from '@material-ui/core';
import AddressEditor from './address-editor';
import { Address } from '../types/ethereum-address';

export interface CertificateCheckerDispatch {
    onClick: (candidate: Address, certificate: string) => void;
    onCandidateChange: (candidate: Address) => void;
    onCertificateChange: (certificate: string) => void;
}

export type CertificateCheckerProps = State & CertificateCheckerDispatch;

export class CertificateChecker extends React.Component<CertificateCheckerProps> {

    private candidateChange(address: Address) {
        this.props.onCandidateChange(address);
    }
    private certificateChange(event: any) {
        this.props.onCertificateChange(event.target.value);
    }

    private get isValid(): boolean {
        if (this.props.candidate == null || this.props.certificate == null) {
            return false;
        }
        return true;
    }

    private onSubmitClicked() {
        if (this.isValid) {
            this.props.onClick(this.props.candidate!, this.props.certificate);
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

    }

    render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs>
                    <FormControl>
                        <AddressEditor
                            placeholder="Candidate address"
                            address={this.props.candidate}
                            onChange={(c) => c && this.candidateChange(c)}
                        />
                        <TextField 
                            id="certificate" 
                            placeholder="Certificate to check" 
                            value={this.props.certificate} 
                            onChange={(c) =>  this.certificateChange(c)} 
                        />
                        <Button onClick={() => this.onSubmitClicked()}>Submit</Button>
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