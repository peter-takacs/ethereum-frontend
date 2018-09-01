import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CertificateChecker from './certificate-checker';
import { dummyAddress } from '../../utils/test/address';
import CertificateLister from './certificate-lister';
import { EthereumOperationState } from '../../state/ethereum-operation-state';
import { Assertion } from '../../types/assertion';

test('Renders correctly in every state without results', () => {
    [
        EthereumOperationState.Idle,
        EthereumOperationState.Completed,
        EthereumOperationState.Completed,
        EthereumOperationState.Error
    ].forEach(state => {
        const component = renderer.create(
            <CertificateLister
                candidate={dummyAddress(0)}
                onCandidateChange={() => { }}
                onSubmit={() => { }}
                status={state}
                results={[] as Assertion[]} />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
})

test('Renders correctly with results', () => {
    const dummyAssertions = [
        {certificate: 'test', issuer: dummyAddress(0)},
        {certificate: 'foo', issuer: dummyAddress(1)},
    ]
    const component = renderer.create(
        <CertificateLister
            candidate={dummyAddress(0)}
            onCandidateChange={() => { }}
            onSubmit={() => { }}
            status={EthereumOperationState.Completed}
            results={dummyAssertions} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('Renders correctly with invalid address', () => {
    const component = renderer.create(
        <CertificateLister
            candidate={null}
            onCandidateChange={() => { }}
            onSubmit={() => { }}
            status={EthereumOperationState.Completed}
            results={[] as Assertion[]} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
