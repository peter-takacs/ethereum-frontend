import { State as NetworkState } from './educator-network';
import { State as AssignmentState } from './certificate-assignment';
import { State as CheckerState } from './certificate-checker';
import { State as Account } from './account';

export interface State {
    educatorNetwork: NetworkState;
    certificateAssignment: AssignmentState;
    certificateChecker: CheckerState;
    account: Account;
}