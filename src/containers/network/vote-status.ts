import { State as RootState } from '../../state/root';
import { connect } from 'react-redux';
import VoteStatus, { VoteStatusProps, VoteStatusState, VoteStatusDispatch } from '../../components/network/vote-status';
import { ThunkDispatch } from 'redux-thunk';
import { Actions, acceptAddition, rejectAddition } from '../../actions/network-member-actions';
import { Address } from '../../types/ethereum-address';
import { NetworkMemberAdditionState } from '../../state/network-member-addition';

const mapStateToProps = (state: RootState): VoteStatusState => {
    return {
        candidateStatuses: Array.from(state.votes.votes.values()),
        address: state.account.address,
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<NetworkMemberAdditionState, undefined, Actions>): VoteStatusDispatch => {
    return {
        onAccept: (candidate: Address) => dispatch(acceptAddition(candidate)),
        onReject: (candidate: Address) => dispatch(rejectAddition(candidate))
    }
}

export default connect<VoteStatusState, VoteStatusDispatch, {}, RootState>(mapStateToProps, mapDispatchToProps)(VoteStatus);