import * as React from 'react';
import { State } from '../state/certificate-assignment';
import { FormControl, Input, Button } from '@material-ui/core';

export interface CertificateAssignmentDispatch {
    onClick: (candidate: string, certificate: string) => void;
    onCandidateChange: (candidate: string) => void;
    onCertificateChange: (certificate: string) => void;
}

export type CertificateAdderProps = State & CertificateAssignmentDispatch;

const CertificateAdder = ({state, onClick, candidate, certificate, onCandidateChange, onCertificateChange}: CertificateAdderProps) => {

    const addressChange = (event: any) => onCandidateChange(event.target.value);
    const certificateChange = (event: any) => onCertificateChange(event.target.value);

    return (
        <FormControl>
            <Input type="text" id="address" placeholder="Candidate address" value={candidate} onChange={addressChange}/>
            <Input type="text" id="certificate" placeholder="Certificate to add" value={certificate} onChange={certificateChange}/>
            <Button onClick={() => onClick(candidate, certificate)}>Submit</Button>
        </FormControl>
    );
}

export default CertificateAdder;