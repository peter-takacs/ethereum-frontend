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
    private readonly onClick: (candidate: Address, certificate: string) => void;
    private readonly candidate: Address | null;
    private readonly certificate: string;
    private readonly onCandidateChange: (candidate: Address) => void;
    private readonly onCertificateChange: (certificate: string) => void;
    private readonly resultText: string;


    private candidateChange(address: Address) {
        this.onCandidateChange(address);
    }
    private certificateChange(event: any) {
        this.onCertificateChange(event.target.value);
    }

    private get isValid() {
        if (this.candidate == null || this.certificate == null) {
            return;
        }
    }

    private onSubmitClicked() {
        if (this.isValid) {
            this.onClick(this.candidate!, this.certificate);
        }
    }

    constructor(props: CertificateCheckerProps) {
        super(props);
        this.onClick = props.onClick;
        this.candidate = props.candidate;
        this.certificate = props.certificate;
        this.onCandidateChange = props.onCandidateChange;
        this.onCertificateChange = props.onCertificateChange;
        switch (props.certificateStatus) {
            case CertificateCheckState.Checking:
                this.resultText = 'Loading...';
                break;
            case CertificateCheckState.Confirmed:
                this.resultText = 'The given address has the certificate';
                break;
            case CertificateCheckState.Rejected:
                this.resultText = 'The given addres does not have the certificate';
                break;
            default:
                this.resultText = '';
                break;
        }

    }

    render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs>
                    <FormControl>
                        <AddressEditor
                            placeholder="Candidate address"
                            address={this.candidate}
                            onChange={this.candidateChange}
                        />
                        <TextField 
                            id="certificate" 
                            placeholder="Certificate to check" 
                            value={this.certificate} 
                            onChange={this.certificateChange} 
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