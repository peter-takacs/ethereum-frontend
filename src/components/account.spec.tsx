import * as React from 'react';
import AccountDisplay from './Account';
import * as renderer from 'react-test-renderer';

test('Renders with correct account', () => {
    const component = renderer.create(
        <AccountDisplay address='0xDEADBEEF' />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})