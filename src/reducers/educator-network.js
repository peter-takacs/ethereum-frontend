import {
    RECEIVE_MEMBERS,
    REQUEST_MEMBERS
} from '../actions';

const educatorNetwork = (state = {members: []}, action) => {
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