import * as React from 'react';
import { Button, Grid, FormControl, Card, CardContent, Typography, CardActions } from '@material-ui/core';
import { State } from '../../state/certificate-lister';
import { Address } from '../../types/ethereum-address';
import { Assertion } from '../../types/assertion';
import { AccountState, Role } from '../../state/account';

export interface CertificateOwnProps {
    assertion: Assertion;
    holder: Address;
};

export interface CertificateDispatch {
    revoke: (assertion: Assertion, holder: Address) => void;
}

interface CertificateState {};

export type CertificateProps = CertificateOwnProps & AccountState;

class Certificate extends React.Component<CertificateProps & CertificateDispatch, CertificateState> {

    private onRevoke() {
        this.props.revoke(this.props.assertion, this.props.holder);
    }

    public render(): JSX.Element {
        return (
            <Card key={this.props.assertion.certificate}>
                <CardContent>
                    <Typography>
                        {this.props.assertion.certificate}
                    </Typography>
                    <Typography color="textSecondary">
                        issued by: {this.props.assertion.issuer.toString()}
                    </Typography>
                </CardContent>
                {this.props.account && this.props.account.role === Role.Educator 
                    ? (
                        <CardActions>
                            <Button onClick={() => this.onRevoke()}>
                                Revoke
                            </Button>
                        </CardActions>
                    )
                    : (<div/>)}
            </Card>
        );
    }
}

export default Certificate;
