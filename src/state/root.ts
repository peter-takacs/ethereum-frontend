import { NetworkMembersState as NetworkState } from './educator-network';
import { CertificateAdderState as AssignmentState } from './certificate-assignment';
import { CertificateCheckerState as CheckerState } from './certificate-checker';
import { AccountState as Account } from './account';
import { State as CertificateListerState } from './certificate-lister';
import { NetworkMemberAdditionState } from './network-member-addition';
import { VotesState } from './votes';

export interface State {
    educatorNetwork: NetworkState;
    certificateAssignment: AssignmentState;
    certificateChecker: CheckerState;
    account: Account;
    certificateLister: CertificateListerState;
    networkMemberAddition: NetworkMemberAdditionState,
    votes: VotesState
}