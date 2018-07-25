import { combineReducers } from 'redux';
import educatorNetwork from './educator-network';
import certificateChecker from './certificate-checker';
import certificateAssignment from './certificate-assignment';

export default combineReducers({
    certificateAssignment,
    educatorNetwork,
    certificateChecker
});