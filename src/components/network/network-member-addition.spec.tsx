import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CertificateChecker from '../certificates/certificate-checker';
import { dummyAddress } from '../../utils/test/address';
import CertificateLister from '../certificates/certificate-lister';
import { EthereumOperationState } from '../../state/ethereum-operation-state';
import { Assertion } from '../../types/assertion';
import NetworkMemberAddition from './network-member-addition';

test('Renders correctly in every state without results', () => {
    [
        EthereumOperationState.Idle,
        EthereumOperationState.Completed,
        EthereumOperationState.Completed,
        EthereumOperationState.Error
    ].forEach(state => {
        const component = renderer.create(
            <NetworkMemberAddition
                onSubmit={() => { }}
                status={state}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
})

test('Renders correctly with invalid address', () => {
    const component = renderer.create(
        <NetworkMemberAddition
            onSubmit={() => { }}
            status={EthereumOperationState.Completed}
        />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

