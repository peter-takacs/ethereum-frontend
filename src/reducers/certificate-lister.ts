import { State } from '../state/certificate-lister';
import { Actions, REQUEST_ASSERTIONS, RECEIVE_ASSERTIONS, CHANGE_ASSERTIONS_QUERY } from '../actions/certificate-lister-actions';
import { Address } from '../types/ethereum-address';
import { EthereumOperationState } from '../state/ethereum-operation-state';

const defaultState: State = {
    candidate: null,
    results: [],
    status: EthereumOperationState.Idle
}
const certificateLister = (state: State = defaultState, action: Actions): State => {
    switch (action.type) {
        case REQUEST_ASSERTIONS:
            return {
                ...state,
                status: EthereumOperationState.InProgress
            }
        case RECEIVE_ASSERTIONS:
            return {
                ...state,
                status: EthereumOperationState.Completed,
                results: action.assertions
            }
       case CHANGE_ASSERTIONS_QUERY:
            return {
                ...state,
                candidate: action.candidate == null 
                    ? state.candidate
                    : action.candidate
            }
        default:
            return state;
    }
}

export default certificateLister;