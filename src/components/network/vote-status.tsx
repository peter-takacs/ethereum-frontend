import * as React from 'react';
import { CandidateVotes } from '../../types/vote';
import { Grid, Typography } from '@material-ui/core';
import CandidateStatus from '../../containers/network/candidate-status';
import { AccountState } from '../../state/account';
import { Address } from '../../types/ethereum-address';

interface OwnVoteStatusState {
    candidateStatuses: CandidateVotes[];
};

export type VoteStatusProps = OwnVoteStatusState & AccountState;


class VoteStatus extends React.Component<VoteStatusProps> {
    public render(): JSX.Element {
        if (this.props.candidateStatuses.length === 0) {
            return (
                <Grid>
                    <Typography>
                        No pending votes available.
                    </Typography>
                </Grid>
            )
        }
        return (
            <Grid>
                {this.props.candidateStatuses.map(candidate => (
                    <Grid
                        key={"c-" + candidate.candidate.toString()}
                    >
                        <CandidateStatus 
                            candidate={candidate.candidate} 
                            votes={candidate.votes}
                        />
                    </Grid>
                ))}
            </Grid>
        )
    }
}

export default VoteStatus;
