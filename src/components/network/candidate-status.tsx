import * as React from 'react';
import { Address } from '../../types/ethereum-address';
import { VoteStatus } from '../../types/vote';
import { Grid, Typography, Button } from '@material-ui/core';
import { AccountState } from '../../state/account';


interface OwnVoteStatusProps {
    candidate: Address | null;
    votes: Map<Address, VoteStatus>
};

type VoteStatusProps = OwnVoteStatusProps & AccountState;

interface VoteStatusState {};

class CandidateStatus extends React.Component<VoteStatusProps, VoteStatusState> {
    public render(): JSX.Element {
        if (this.props.candidate != null)
        {
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
                                    <Grid item container>
                                        <Button>
                                            Accept
                                        </Button>
                                        <Button>
                                            Reject
                                        </Button>
                                    </Grid>
                                )
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
