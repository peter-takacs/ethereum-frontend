import {
    Actions
} from '../actions/network-member-actions';
import { NetworkMemberAdditionState } from '../state/network-member-addition';
import { EthereumOperationState } from '../state/ethereum-operation-state';

const networkMemberAddition = (state: NetworkMemberAdditionState = {status: EthereumOperationState.Idle}, action: Actions) => {
    switch (action.type) {
       default:
            return state;
    }
}

export default networkMemberAddition;