import * as React from 'react';
import { Button, Grid, FormControl, Card, CardContent, Typography } from '@material-ui/core';
import { State } from '../../state/certificate-lister';
import { Address } from '../../types/ethereum-address';
import { Assertion } from '../../types/assertion';

interface CertificateProps {
    assertion: Assertion;
};

interface CertificateState {};

class Certificate extends React.Component<CertificateProps, CertificateState> {
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
            </Card>
        );
    }
}

export default Certificate;
