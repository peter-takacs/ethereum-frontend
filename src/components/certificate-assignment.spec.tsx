
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CertificateAdder from './certificate-assignment';
import { CertificateQueryState } from '../state/certificate-assignment';

test('Renders correctly in every state', () => {
    [
        CertificateQueryState.Assigned,
        CertificateQueryState.Idle,
        CertificateQueryState.Loading,
        CertificateQueryState.NotAssigned
    ].forEach(state => {
        const component = renderer.create(
            <CertificateAdder
                candidate="0xABCD"
                certificate="0x1234"
                onCandidateChange={() => { }}
                onCertificateChange={() => { }}
                onClick={() => { }}
                state={state} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
})