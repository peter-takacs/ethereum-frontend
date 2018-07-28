import { combineReducers } from 'redux';
import educatorNetwork from './educator-network';
import certificateChecker from './certificate-checker';
import certificateAssignment from './certificate-assignment';

export const rootReducer = combineReducers({
    certificateAssignment,
    educatorNetwork,
    certificateChecker
});