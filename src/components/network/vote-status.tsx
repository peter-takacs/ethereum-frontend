import * as React from 'react';
import { CandidateVotes } from '../../types/vote';
import { Grid, Typography } from '@material-ui/core';
import CandidateStatus from './candidate-status';

interface VoteStatusProps {
    candidateStatuses: CandidateVotes[];
};

interface VoteStatusState {};

class VoteStatus extends React.Component<VoteStatusProps, VoteStatusState> {
    public render(): JSX.Element {
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
