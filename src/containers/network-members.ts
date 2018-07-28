import NetworkMembers from '../components/network-members';
import { State as RootState } from '../state/root';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => {
    return {
        members: state.educatorNetwork.members
    };
}

export default connect(mapStateToProps)(NetworkMembers);