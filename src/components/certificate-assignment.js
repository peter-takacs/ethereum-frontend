import React from 'react';

const CertificateAdder = ({status, onClick, candidate, certificate, onChange}) => {
    let addressInput;
    let certificateInput;

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
            <input type="text" id="certificate" placeholder="Certificate to add" value={certificate} ref={node => certificateInput = node} onChange={handleChange}/>
            <button onClick={() => onClick(candidate, certificate)}>Submit</button>
            </div>
        </div>
    );
}

export default CertificateAdder;