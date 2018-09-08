import * as React from 'react';
import { Address } from '../../types/ethereum-address';
import { VoteStatus } from '../../types/vote';
import { Grid, Typography, Button } from '@material-ui/core';
import { AccountState } from '../../state/account';
import VotingButtons from './voting-buttons';


export interface OwnProps {
    votes: Map<Address, VoteStatus>
    candidate: Address | null;
};

export interface CandidateStatusState {
}

export interface CandidateStatusDispatch {
    onAccept: (candidate: Address) => void;
    onReject: (candidate: Address) => void;
}

export type CandidateStatusProps = AccountState & CandidateStatusState & OwnProps;

class CandidateStatus extends React.Component<CandidateStatusProps & CandidateStatusDispatch> {
    public render(): JSX.Element {
        if (this.props.candidate != null)
        {
            const candidateToVote = this.props.candidate;
            return (
                <Grid container>
                    <Typography>
                        {this.props.candidate.toString()}
                    </Typography>
                    {Array.from(this.props.votes).map(([key, status]) => (
                        <Grid key={"v-" + key.toString()} container spacing={24}>
                            <Grid item>
                                {key.toString()}
                            </Grid>
                            <Grid item>
                                {status}
                            </Grid>
                            {this.props.address && this.props.address.equals(key) 
                                ? (
                                    <VotingButtons 
                                        candidate={candidateToVote}
                                        onAccept={this.props.onAccept}
                                        onReject={this.props.onReject}
                                    />)
                                : (<Grid item/>)}
                        </Grid>
                    ))}
                </Grid>
            );
        }
        return (<div/>);
    }
}

export default CandidateStatus;
