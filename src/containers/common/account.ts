
import AccountDisplay from '../../components/common/account'
import { connect } from 'react-redux';
import { State as RootState } from '../../state/root';
import { State } from '../../state/account';

const mapStateToProps = (state: RootState): State => {
    return {
        address: state.account.address
    }
}
export default connect(mapStateToProps)(AccountDisplay);