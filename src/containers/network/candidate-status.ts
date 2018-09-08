
import { State as RootState } from '../../state/root';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Actions, acceptAddition, rejectAddition } from '../../actions/network-member-actions';
import { Address } from '../../types/ethereum-address';
import { NetworkMemberAdditionState } from '../../state/network-member-addition';
import CandidateStatus, { CandidateStatusProps, CandidateStatusDispatch, OwnProps } from '../../components/network/candidate-status';

const mapStateToProps = (state: RootState, ownProps: OwnProps): CandidateStatusProps => {
    return {
        account: state.account.account,
        ...ownProps
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<NetworkMemberAdditionState, undefined, Actions>): CandidateStatusDispatch => {
    return {
        onAccept: (candidate: Address) => dispatch(acceptAddition(candidate)),
        onReject: (candidate: Address) => dispatch(rejectAddition(candidate))
    }
}

export default connect<CandidateStatusProps, CandidateStatusDispatch, OwnProps, RootState>(
    mapStateToProps, 
    mapDispatchToProps)
(CandidateStatus);