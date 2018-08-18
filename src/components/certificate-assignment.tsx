import * as React from 'react';
import { State } from '../state/certificate-assignment';
import { FormControl, Input, Button, TextField, Grid } from '@material-ui/core';
import { sha256 } from 'js-sha256';
export interface CertificateAssignmentDispatch {
    onClick: (candidate: string, certificate: string) => void;
    onCandidateChange: (candidate: string) => void;
    onCertificateChange: (certificate: string) => void;
}

export type CertificateAdderProps = State & CertificateAssignmentDispatch;

const CertificateAdder = ({ onClick, candidate, certificate, onCandidateChange, onCertificateChange }: CertificateAdderProps) => {

    const addressChange = (event: any) => onCandidateChange(event.target.value);
    const certificateChange = (event: any) => onCertificateChange(event.target.value);

    return (
        <Grid container spacing={24}>
            <Grid item xs>
                <FormControl>
                    <TextField type="text" id="address" placeholder="Candidate address" value={candidate} onChange={addressChange} />
                    <TextField type="text" id="certificate"
                        placeholder="Certificate to add"
                        value={certificate}
                        onChange={certificateChange}
                        multiline={true}
                        rows={4} />
                    <Button onClick={() => onClick(candidate, certificate)}>Submit</Button>
                </FormControl>
            </Grid>
            <Grid item xs>
                Hash of current assertion to be submitted: { sha256(certificate || '') }
            </Grid>
        </Grid>
    );
}

export default CertificateAdder;