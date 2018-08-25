
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CertificateAdder from './certificate-assignment';
import { CertificateQueryState } from '../state/certificate-assignment';
import { dummyAddress } from '../utils/test/address';

test('Renders correctly in every state', () => {
    [
        CertificateQueryState.Assigned,
        CertificateQueryState.Idle,
        CertificateQueryState.Loading,
        CertificateQueryState.NotAssigned
    ].forEach(state => {
        const component = renderer.create(
            <CertificateAdder
                candidate={null}
                certificate="0x1234"
                onCandidateChange={() => { }}
                onCertificateChange={() => { }}
                onClick={() => { }}
                state={state} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

test('Renders correctly with a correct address', () => {
    const component = renderer.create(
        <CertificateAdder
            candidate={dummyAddress(0)}
            certificate="dummy"
            onCandidateChange={() => {}}
            onCertificateChange={() => {}}
            onClick={() => {}}
            state={CertificateQueryState.Idle}
        />);
    expect(component.toJSON()).toMatchSnapshot();
});


test('Renders correctly with an empty address', () => {
    const component = renderer.create(
        <CertificateAdder
            candidate={null}
            certificate="dummy"
            onCandidateChange={() => {}}
            onCertificateChange={() => {}}
            onClick={() => {}}
            state={CertificateQueryState.Idle}
        />);
    expect(component.toJSON()).toMatchSnapshot();
});