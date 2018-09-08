
import AccountDisplay from '../../components/common/account'
import { connect } from 'react-redux';
import { State as RootState } from '../../state/root';
import { AccountState } from '../../state/account';

const mapStateToProps = (state: RootState): AccountState => {
    return {
        address: state.account.address
    }
}
export default connect(mapStateToProps)(AccountDisplay);