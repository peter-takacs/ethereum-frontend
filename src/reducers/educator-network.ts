import {
    RECEIVE_MEMBERS,
    REQUEST_MEMBERS,
    Actions
} from '../actions/network-member-actions';
import { NetworkMembersState } from '../state/educator-network';

const educatorNetwork = (state: NetworkMembersState = {members: []}, action: Actions) => {
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