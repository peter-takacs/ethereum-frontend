import { combineReducers } from 'redux';
import educatorNetwork from './educator-network';
import certificateChecker from './certificate-checker';

export default combineReducers({
    educatorNetwork,
    certificateChecker
});