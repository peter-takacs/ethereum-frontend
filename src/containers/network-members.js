import { connect } from 'react-redux';
import NetworkMembers from '../components/network-members';

const mapStateToProps = state => {
    return {
        members: state.educatorNetwork.members
    };
}

export default connect(mapStateToProps)(NetworkMembers);