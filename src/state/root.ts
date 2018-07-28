import { State as NetworkState } from './educator-network';
import { State as AssignmentState } from './certificate-assignment';
import { State as CheckerState } from './certificate-checker';

export interface State {
    educatorNetwork: NetworkState;
    certificateAssignment: AssignmentState;
    certificateChecker: CheckerState;
}