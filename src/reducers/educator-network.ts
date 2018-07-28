import {
    RECEIVE_MEMBERS,
    REQUEST_MEMBERS,
    Actions
} from '../actions/network-member-actions';
import { State } from '../state/educator-network';

const educatorNetwork = (state: State = {members: []}, action: Actions) => {
    switch (action.type) {
        case RECEIVE_MEMBERS:
            return {
                ...state,
                members: action.members
            }
        default:
            return state;
    }
}

export default educatorNetwork;