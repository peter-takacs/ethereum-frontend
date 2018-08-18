import * as React from 'react';
import { State } from '../state/certificate-assignment';

export interface CertificateAdderProps extends State {
    onClick: (candidate: string, certificate: string) => void;
    onChange: (candidate: string, certificate: string) => void;
}

const CertificateAdder = ({state, onClick, candidate, certificate, onChange}: CertificateAdderProps) => {
    let addressInput: HTMLInputElement;
    let certificateInput: HTMLTextAreaElement;

    let handleChange = () => {
        onChange(addressInput.value, certificateInput.value);
    }

    return (
        <div>
            <header>
            Certificate adder 
            </header>
            <div>
            <input type="text" id="address" placeholder="Candidate address" value={candidate} ref={node => addressInput = node} onChange={handleChange}/>
            <textarea id="certificate" placeholder="Certificate to add" value={certificate} ref={node => certificateInput = node} onChange={handleChange}/>
            <button onClick={() => onClick(candidate, certificate)}>Submit</button>
            </div>
        </div>
    );
}

export default CertificateAdder;