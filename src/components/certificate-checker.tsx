import * as React from 'react';
import { State, CertificateCheckState } from '../state/certificate-checker';
import { Input, FormControl, Button, TextField, Grid } from '@material-ui/core';

export interface CertificateCheckerDispatch {
    onClick: (candidate: string, certificate: string) => void;
    onCandidateChange: (candidate: string) => void;
    onCertificateChange: (certificate: string) => void;
}

export type CertificateCheckerProps = State & CertificateCheckerDispatch;


const CertificateChecker = ({ certificateStatus, onClick, candidate, certificate, onCandidateChange, onCertificateChange }: CertificateCheckerProps) => {

    const certificateChange = (event: any) => onCertificateChange(event.target.value);
    const candidateChange = (event: any) => onCandidateChange(event.target.value);
    let resultText = '';
    switch (certificateStatus) {
        case CertificateCheckState.Checking:
            resultText = 'Loading...';
            break;
        case CertificateCheckState.Confirmed:
            resultText = 'The given address has the certificate';
            break;
        case CertificateCheckState.Rejected:
            resultText = 'The given addres does not have the certificate';
            break;
    }
    return (
        <Grid container spacing={24}>
            <Grid item xs>
                <FormControl>
                    <TextField id="address" placeholder="Candidate address" value={candidate} onChange={candidateChange} />
                    <TextField id="certificate" placeholder="Certificate to check" value={certificate} onChange={certificateChange} />
                    <Button onClick={() => onClick(candidate, certificate)}>Submit</Button>
                </FormControl>
            </Grid>
            <Grid item xs>
                {resultText}
            </Grid>
        </Grid>
    );
}

export default CertificateChecker;