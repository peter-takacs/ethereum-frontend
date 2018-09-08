import { State as RootState } from '../../state/root';
import { connect } from 'react-redux';
import VoteStatus, { VoteStatusProps } from '../../components/network/vote-status';
import { ThunkDispatch } from 'redux-thunk';
import { Actions, acceptAddition, rejectAddition } from '../../actions/network-member-actions';
import { Address } from '../../types/ethereum-address';
import { NetworkMemberAdditionState } from '../../state/network-member-addition';

const mapStateToProps = (state: RootState): VoteStatusProps => {
    return {
        candidateStatuses: Array.from(state.votes.votes.values()),
        account: state.account.account
    };
}

export default connect<VoteStatusProps, {}, {}, RootState>(mapStateToProps)(VoteStatus);