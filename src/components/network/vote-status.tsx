import * as React from 'react';
import { CandidateVotes } from '../../types/vote';
import { Grid, Typography } from '@material-ui/core';
import CandidateStatus from './candidate-status';
import { AccountState } from '../../state/account';
import { Address } from '../../types/ethereum-address';

interface OwnVoteStatusState {
    candidateStatuses: CandidateVotes[];
};

export type VoteStatusState = OwnVoteStatusState & AccountState;

export interface VoteStatusDispatch {
    onAccept: (candidate: Address) => void;
    onReject: (candidate: Address) => void;
}

export type VoteStatusProps = VoteStatusState & VoteStatusDispatch;


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
                            onAccept={this.props.onAccept}
                            onReject={this.props.onReject}
                        />
                    </Grid>
                ))}
            </Grid>
        )
    }
}

export default VoteStatus;
