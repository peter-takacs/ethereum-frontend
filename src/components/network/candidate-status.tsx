import * as React from 'react';
import { Address } from '../../types/ethereum-address';
import { VoteStatus } from '../../types/vote';
import { Grid, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
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
    
    private translateStatus(voteStatus: VoteStatus) {
        switch (voteStatus) {
            case VoteStatus.Accept:
                return (<Typography>Accepted</Typography>);
            case VoteStatus.Reject:
                return (<Typography>Rejected</Typography>);
            case VoteStatus.Pending:
                return (<Typography>Pending</Typography>);
        }
    }
    
    public render(): JSX.Element {
        if (this.props.candidate != null)
        {
            const candidateToVote = this.props.candidate;
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Voter</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(this.props.votes).map(([key, status]) => (
                            <TableRow key={"v-" + key.toString()}>
                                <TableCell>
                                    {key.toString()}
                                </TableCell>
                                <TableCell>
                                    {this.translateStatus(status)}
                                </TableCell>
                                <TableCell>
                                    {this.props.account && 
                                    this.props.account.address.equals(key) &&
                                    status === VoteStatus.Pending   
                                        ? (
                                            <VotingButtons
                                                candidate={candidateToVote}
                                                onAccept={this.props.onAccept}
                                                onReject={this.props.onReject}
                                            />)
                                        : (<Grid item />)}
                                </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            );
        }
        return (<div/>);
    }
}

export default CandidateStatus;
