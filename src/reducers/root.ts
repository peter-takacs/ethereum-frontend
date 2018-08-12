import { combineReducers } from 'redux';
import educatorNetwork from './educator-network';
import certificateChecker from './certificate-checker';
import certificateAssignment from './certificate-assignment';
import account from './account';

export const rootReducer = combineReducers({
    account,
    certificateAssignment,
    educatorNetwork,
    certificateChecker
});