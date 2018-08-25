import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Address } from '../types/ethereum-address';
import AddressEditor from './address-editor';

test('It renders correctly with an empty address', () => {
    const tree = renderer.create(
        <AddressEditor address={null} onChange={() => {}}/>
    )
    expect(tree.toJSON()).toMatchSnapshot();
})


test('It renders correctly with a correct address', () => {
    const address = new Address('0x0000111122223333444455556666777788889999');
    const tree = renderer.create(
        <AddressEditor address={address} onChange={() => {}}/>
    )
    expect(tree.toJSON()).toMatchSnapshot();
})