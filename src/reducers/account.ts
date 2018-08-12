import { State } from "../state/account";
import { Actions, SET_ACCOUNT, REQUEST_ACCOUNT } from "../actions/account-actions";

const account = (state: State = {address: ''}, action: Actions): State => {
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