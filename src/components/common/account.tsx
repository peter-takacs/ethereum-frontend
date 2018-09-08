import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AccountState } from '../../state/account';

const AccountDisplay = ({address}: AccountState) => {
    if (address == null) {
        return (
            <div>
                Current ETH account is unavailable.
            </div>
        )
    }
    return (
        <div>
            Current account is: { address.toString() }
        </div>
    )
}

export default AccountDisplay;