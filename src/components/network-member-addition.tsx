import * as React from 'react';
import { Address } from '../types/ethereum-address';
import { EthereumOperationState } from '../state/ethereum-operation-state';
import { NetworkMemberAdditionState } from '../state/network-member-addition';
import { Grid, Button } from '@material-ui/core';
import AddressEditor from './address-editor';

export interface NetworkMemberAdditionDispatch {
    onSubmit: (address: Address) => void;
}


export type NetworkMemberAdditionProps = NetworkMemberAdditionDispatch & NetworkMemberAdditionState;

interface ComponentState {
    memberAddress: Address | null;
};

class NetworkMemberAddition extends React.Component<NetworkMemberAdditionProps, ComponentState> {
    
    constructor(props: NetworkMemberAdditionProps) {
        super(props);
        this.state = {
            memberAddress: null
        }
    }

    public render(): JSX.Element {
        return (
            <Grid container spacing={24}>
                <AddressEditor
                    address={null}
                    placeholder="Candidate to be added"
                    onChange={(a) => this.onAddressChanged(a)}
                />
                <Button
                    disabled={this.state.memberAddress == null}
                    onClick={() => this.onSubmit()}
                >
                Submit
                </Button>
            </Grid>
        );
    }

    onSubmit(): void {
        if (this.state.memberAddress != null) {
            this.props.onSubmit(this.state.memberAddress);
        }
    }
    
    onAddressChanged(memberAddress: Address | null): void {
        this.setState({
            memberAddress
        });
    }
}

export default NetworkMemberAddition;
