import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import NetworkMembers from './network-members';
import { dummyAddress } from '../utils/test/address';

test('Renders correctly', () => {
    const component = renderer.create(
        <NetworkMembers members={
            [dummyAddress(0), dummyAddress(1)]
        } />
    )
    expect(component.toJSON()).toMatchSnapshot();
})