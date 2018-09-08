import * as React from 'react';
import { CandidateVotes } from '../../types/vote';
import { Grid, Typography } from '@material-ui/core';
import CandidateStatus from './candidate-status';
import { AccountState } from '../../state/account';

interface OwnVoteStatusProps {
    candidateStatuses: CandidateVotes[];
};

export type VoteStatusProps = OwnVoteStatusProps & AccountState;

interface VoteStatusState {};

class VoteStatus extends React.Component<VoteStatusProps, VoteStatusState> {
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
                            address={this.props.address}
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
