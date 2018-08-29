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
    
    private addressChange(address: Address) {
        this.props.onCandidateChange(address);
    }
    private certificateChange(event: any) {
        this.props.onCertificateChange(event.target.value);
    }

    private static isValid(props: CertificateAdderProps): boolean {
        if (props.candidate == null || props.certificate == null) {
            return false;
        }
        return true;
    }

    private onSubmitClicked() {
        if (CertificateAdder.isValid(this.props)) {
            this.props.onClick(this.props.candidate!, this.props.certificate);
        }
    }

    constructor(props: CertificateAdderProps) {
        super(props);
    }

    public render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs>
                    <FormControl>
                        <AddressEditor
                            address={this.props.candidate}
                            placeholder="Candidate address"
                            onChange={(address) => this.addressChange(address)}
                        />
                        <TextField type="text" id="certificate"
                            placeholder="Certificate to add"
                            value={this.props.certificate}
                            onChange={(certificate) => this.certificateChange(certificate)}
                            multiline={true}
                            rows={4} />
                        <Button 
                            onClick={() => this.onSubmitClicked()}
                            disabled={!CertificateAdder.isValid(this.props)}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs>
                    Hash of current assertion to be submitted: {sha256(this.props.certificate || '')}
                </Grid>
            </Grid>
        );
    }

}

export default CertificateAdder;