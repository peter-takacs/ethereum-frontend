import React from 'react';

const CertificateChecker = ({hasCertificate, onClick, candidate, certificate, onChange}) => {
    let addressInput;
    let certificateInput;

    let handleChange = () => {
        onChange(addressInput.value, certificateInput.value);
    }

    return (
        <div>
            <header>
            Certificate checker 
            </header>
            <div>
            <input type="text" id="address" placeholder="Candidate address" value={candidate} ref={node => addressInput = node} onChange={handleChange}/>
            <input type="text" id="certificate" placeholder="Certificate to check" value={certificate} ref={node => certificateInput = node} onChange={handleChange}/>
            <button onClick={() => onClick(candidate, certificate)}>Submit</button>
            </div>
        </div>
    );
}

export default CertificateChecker;