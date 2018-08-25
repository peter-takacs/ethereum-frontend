import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import NetworkMembers from './network-members';

test('Renders correctly', () => {
    const component = renderer.create(
        <NetworkMembers members={
            ['0x0123', '0xABCD']
        } />
    )
    expect(component.toJSON()).toMatchSnapshot();
})