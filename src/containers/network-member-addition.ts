import CertificateAdder, { CertificateAssignmentDispatch } from '../components/certificates/certificate-assignment';
import { requestAddition } from '../actions/network-member-actions';
import { connect } from 'react-redux';
import { State as RootState } from '../state/root';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../actions/network-member-actions';
import { Address } from '../types/ethereum-address';
import NetworkMemberAddition, { NetworkMemberAdditionProps, NetworkMemberAdditionDispatch } from '../components/network/network-member-addition';
import { NetworkMemberAdditionState } from '../state/network-member-addition';

const mapDispatchToProps = (dispatch: ThunkDispatch<NetworkMemberAdditionState, undefined, Actions>): NetworkMemberAdditionDispatch => ({
    onSubmit: (member: Address) => dispatch(requestAddition(member))
})

const mapStateToProps = (state: RootState): NetworkMemberAdditionState => {
    return {
        status: state.networkMemberAddition.status
    }
}
export default connect<NetworkMemberAdditionState, NetworkMemberAdditionDispatch, {}, RootState>(
    mapStateToProps, 
    mapDispatchToProps)
(NetworkMemberAddition);