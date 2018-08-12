import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { State } from '../state/account';

const AccountDisplay = ({address}: State) => {
    return (
        <div>
            Current account is: { address }
        </div>
    )
}

export default AccountDisplay;