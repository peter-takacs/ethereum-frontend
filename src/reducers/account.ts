import { AccountState } from "../state/account";
import { Actions, SET_ACCOUNT, REQUEST_ACCOUNT } from "../actions/account-actions";

const account = (state: AccountState = {address: null}, action: Actions): AccountState => {
    switch (action.type) {
        case SET_ACCOUNT:
            return {
                address: action.address
            }
        default:
            return state;
    }
}

export default account;