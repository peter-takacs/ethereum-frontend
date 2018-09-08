
import AccountDisplay from '../../components/common/account'
import { connect } from 'react-redux';
import { State as RootState } from '../../state/root';
import { AccountState } from '../../state/account';

const mapStateToProps = (state: RootState): AccountState => {
    return {
        account: state.account.account
    }
}
export default connect(mapStateToProps)(AccountDisplay);