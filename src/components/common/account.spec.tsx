import * as React from 'react';
import AccountDisplay from './account';
import * as renderer from 'react-test-renderer';
import { Address } from '../../types/ethereum-address';
import { dummyAccount } from '../../utils/test/address';

test('Renders with correct account', () => {
    const component = renderer.create(
        <AccountDisplay account={dummyAccount(0)} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})

test('Renders with empty account', () => {
    const component = renderer.create(
        <AccountDisplay account={null} />
    )

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})
