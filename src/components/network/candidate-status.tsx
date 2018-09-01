import * as React from 'react';
import { Address } from '../../types/ethereum-address';
import { VoteStatus } from '../../types/vote';
import { Grid, Typography } from '@material-ui/core';

interface VoteStatusProps {
    candidate: Address | null;
    votes: Map<Address, VoteStatus>
};

interface VoteStatusState {};

class ComponentName extends React.Component<VoteStatusProps, VoteStatusState> {
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
                        </Grid>
                    ))}
                </Grid>
            );
        }
        return (<div/>);
    }
}

export default ComponentName;
