import Navigator, { NavigatorProps } from '../../components/common/navigator'
import { connect } from 'react-redux';
import { State as RootState } from '../../state/root';

const mapStateToProps = (state: RootState): NavigatorProps => {
    return {
        account: state.account.account
    }
}
export default connect(mapStateToProps)(Navigator);