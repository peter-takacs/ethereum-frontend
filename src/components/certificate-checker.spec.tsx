

import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CertificateChecker from './certificate-checker';
import { CertificateCheckState } from '../state/certificate-checker';

test('Renders correctly in every state', () => {
    [
        CertificateCheckState.Idle,
        CertificateCheckState.Checking,
        CertificateCheckState.Confirmed,
        CertificateCheckState.Rejected
    ].forEach(state => {
        const component = renderer.create(
            <CertificateChecker
                candidate="0xABCD"
                certificate="0x1234"
                onCandidateChange={() => { }}
                onCertificateChange={() => { }}
                onClick={() => { }}
                certificateStatus={state} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
})