import * as React from 'react';
import AccountDisplay from './Account';
import * as renderer from 'react-test-renderer';
import { Address } from '../../types/ethereum-address';

const dummyAccount = '0x1234567890abcdef01231234567890abcdef0123';

test('Renders with correct account', () => {
    const component = renderer.create(
        <AccountDisplay address={new Address(dummyAccount)} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('Renders with empty account', () => {
    const component = renderer.create(
        <AccountDisplay address={null} />
    )

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})