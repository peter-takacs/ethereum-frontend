import * as React from 'react';
import { State } from '../state/certificate-assignment';
import { FormControl, Input, Button, TextField, Grid } from '@material-ui/core';
import { sha256 } from 'js-sha256';
import { Address } from '../types/ethereum-address';
import AddressEditor from './address-editor';


export interface CertificateAssignmentDispatch {
    onClick: (candidate: Address, certificate: string) => void;
    onCandidateChange: (candidate: Address) => void;
    onCertificateChange: (certificate: string) => void;
}

export type CertificateAdderProps = State & CertificateAssignmentDispatch;

export class CertificateAdder extends React.Component<CertificateAdderProps> {
    private readonly onClick: (candidate: Address, certificate: string) => void;
    private readonly candidate: Address | null;
    private readonly certificate: string;
    private readonly onCandidateChange: (candidate: Address) => void;
    private readonly onCertificateChange: (certificate: string) => void;


    private addressChange(address: Address) {
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

    constructor(props: CertificateAdderProps) {
        super(props);
        this.onClick = props.onClick;
        this.candidate = props.candidate;
        this.certificate = props.certificate;
        this.onCandidateChange = props.onCandidateChange;
        this.onCertificateChange = props.onCertificateChange;
    }

    public render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs>
                    <FormControl>
                        <AddressEditor
                            address={this.candidate}
                            placeholder="Candidate address"
                            onChange={this.addressChange}
                        />
                        <TextField type="text" id="certificate"
                            placeholder="Certificate to add"
                            value={this.certificate}
                            onChange={this.certificateChange}
                            multiline={true}
                            rows={4} />
                        <Button 
                            onClick={this.onSubmitClicked}
                            disabled={!this.isValid}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs>
                    Hash of current assertion to be submitted: {sha256(this.certificate || '')}
                </Grid>
            </Grid>
        );
    }

}

export default CertificateAdder;