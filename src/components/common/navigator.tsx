import * as React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Role, Account } from '../../state/account';

export interface NavigatorProps {
    account: Account | null;
};

interface Route {
    path: string;
    title: string;
    allowedRoles: Role[];
}

class Navigator extends React.Component<NavigatorProps> {

    private readonly links: Route[] = [
        { path: 'members', title: 'Members', allowedRoles: [Role.Educator] },
        { path: 'check', title: 'Check certificate', allowedRoles: [Role.Reader, Role.Educator] },
        { path: 'assign', title: 'Assign certificate', allowedRoles: [Role.Educator] },
        { path: 'lister', title: 'List certificates', allowedRoles: [Role.Reader, Role.Educator] },
        { path: 'network-addition', title: 'Add members', allowedRoles: [Role.Educator] },
        { path: 'votes', title: 'Pending votes', allowedRoles: [Role.Educator] }
    ]

    public render(): JSX.Element {
        let role = Role.Reader;
        if (this.props.account != null) {
            role = this.props.account.role
        }
        return (
        <List>
            {this.links.filter(link => link.allowedRoles.includes(role)).map(link => (
                <ListItem key={link.path}>
                    <Link to={link.path} >{link.title} </Link>
                </ListItem>
            ))}
        </List>);
    }
}

export default Navigator;
