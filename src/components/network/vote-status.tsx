import * as React from 'react';
import { CandidateVotes } from '../../types/vote';
import { Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import CandidateStatus from '../../containers/network/candidate-status';
import { AccountState } from '../../state/account';
import { Address } from '../../types/ethereum-address';

interface OwnVoteStatusState {
    candidateStatuses: CandidateVotes[];
};

export type VoteStatusProps = OwnVoteStatusState & AccountState;

interface VoteStatusState {
    expanded: Address | null;
} 


class VoteStatus extends React.Component<VoteStatusProps, VoteStatusState> {

    constructor(props: VoteStatusProps) {
        super(props);
        this.state = {
            expanded: null
        };
    }

    expand(candidate: Address) {
        this.setState({
            expanded: candidate
        })
    }

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
                        <ExpansionPanel
                            expanded={candidate.candidate.equals(this.state.expanded)}
                            onChange={() => this.expand(candidate.candidate)}>
                            <ExpansionPanelSummary>
                                Candidate: {candidate.candidate.toString()}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <CandidateStatus
                                    candidate={candidate.candidate}
                                    votes={candidate.votes}
                                />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                ))}
            </Grid>
        )
    }
}

export default VoteStatus;
