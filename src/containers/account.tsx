
import AccountDisplay from '../components/account'
import { } from '../actions/account-actions';
import { connect } from 'react-redux';
import { State as RootState } from '../state/root';
import { State } from '../state/account';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../actions/certificate-assignment-actions';


const mapStateToProps = (state: RootState): State => {
    return {
        address: state.account.address
    }
}
export default connect(mapStateToProps)(AccountDisplay);