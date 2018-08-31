import * as React from 'react';
import { CertificateAdderState } from '../state/certificate-assignment';
import { FormControl, Input, Button, TextField, Grid } from '@material-ui/core';
import { sha256 } from 'js-sha256';
import { Address } from '../types/ethereum-address';
import AddressEditor from './address-editor';


export interface CertificateAssignmentDispatch {
    onClick: (candidate: Address, certificate: string) => void;
}

export type CertificateAdderProps = CertificateAdderState & CertificateAssignmentDispatch;

interface State {
    candidate: Address | null;
    certificate: string;
}

export class CertificateAdder extends React.Component<CertificateAdderProps, State> {
    
    private addressChange(candidate: Address) {
        this.setState({
            candidate 
        })
    }
    private certificateChange(certificate: string) {
        this.setState({
            certificate 
        })
    }

    private isValid(): boolean {
        if (this.state.candidate == null || this.state.certificate == null) {
            return false;
        }
        return true;
    }

    private onSubmitClicked() {
        if (this.isValid()) {
            this.props.onClick(this.state.candidate!, this.state.certificate);
        }
    }

    constructor(props: CertificateAdderProps) {
        super(props);
        this.state = {
            candidate: null,
            certificate: ''
        }
    }

    public render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs>
                    <FormControl>
                        <AddressEditor
                            address={this.state.candidate}
                            placeholder="Candidate address"
                            onChange={(address) => address && this.addressChange(address)}
                        />
                        <TextField type="text" id="certificate"
                            placeholder="Certificate to add"
                            value={this.state.certificate}
                            onChange={(certificate) => this.certificateChange(certificate.target.value)}
                            multiline={true}
                            rows={4} />
                        <Button 
                            onClick={() => this.onSubmitClicked()}
                            disabled={!this.isValid()}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs>
                    Hash of current assertion to be submitted: {sha256(this.state.certificate)}
                </Grid>
            </Grid>
        );
    }

}

export default CertificateAdder;