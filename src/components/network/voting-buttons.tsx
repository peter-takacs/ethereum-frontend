import * as React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { Address } from '../../types/ethereum-address';

interface VotingButtonsProps {
    candidate: Address;
    onAccept: (candidate: Address) => void;
    onReject: (candidate: Address) => void;
};

interface VotingButtonsState {};

class VotingButtons extends React.Component<VotingButtonsProps, VotingButtonsState> {
    public render(): JSX.Element {
        return (
            <Grid item container>
                <Button
                    onClick={() => this.props.onAccept(this.props.candidate)}
                >
                    Accept
                </Button>
                <Button
                    onClick={() => this.props.onReject(this.props.candidate)}
                >
                    Reject
                </Button>
            </Grid>
        );
    }
}

export default VotingButtons;
