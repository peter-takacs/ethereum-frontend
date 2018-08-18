import * as React from 'react';
import { State } from '../state/certificate-assignment';
import { FormControl, Input } from '@material-ui/core';

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
            <textarea id="certificate" placeholder="Certificate to add" value={certificate} onChange={certificateChange}/>
            <button onClick={() => onClick(candidate, certificate)}>Submit</button>
        </FormControl>
    );
}

export default CertificateAdder;