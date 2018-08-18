import * as React from 'react';
import { State } from '../state/certificate-checker';
import { Input, FormControl, Button } from '@material-ui/core';

export interface CertificateCheckerDispatch {
    onClick: (candidate: string, certificate: string) => void;
    onCandidateChange: (candidate: string) => void;
    onCertificateChange: (certificate: string) => void;
}

export type CertificateCheckerProps = State & CertificateCheckerDispatch;


const CertificateChecker = ({ hasCertificate, onClick, candidate, certificate, onCandidateChange, onCertificateChange }: CertificateCheckerProps) => {

    const certificateChange = (event: any) => onCertificateChange(event.target.value);
    const candidateChange = (event: any) => onCandidateChange(event.target.value);

    return (
        <div>
            <FormControl>
                <Input type="text" id="address" placeholder="Candidate address" value={candidate} onChange={candidateChange} />
                <Input type="text" id="certificate" placeholder="Certificate to check" value={certificate} onChange={certificateChange} />
                <Button onClick={() => onClick(candidate, certificate)}>Submit</Button>
            </FormControl>
        </div>
    );
}

export default CertificateChecker;