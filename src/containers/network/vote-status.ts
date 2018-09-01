import { State as RootState } from '../../state/root';
import { connect } from 'react-redux';
import VoteStatus, { VoteStatusProps } from '../../components/network/vote-status';

const mapStateToProps = (state: RootState): VoteStatusProps => {
    return {
        candidateStatuses: Array.from(state.votes.votes.values())
    };
}

export default connect(mapStateToProps)(VoteStatus);