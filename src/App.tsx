import * as React from 'react'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import NetworkMembers from './containers/network/network-members';
import CertificateChecker from './containers/certificates/certificate-checker';
import CertificateAdder from './containers/certificates/certificate-assignment';
import AccountDisplay from './containers/common/account';
import CertificateLister from './containers/certificates/certificate-lister';
import NetworkMemberAddition from './containers/network/network-member-addition';
import VoteStatus from './containers/network/vote-status';

import { Link, Route } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, Drawer, withStyles, createStyles, Theme, WithStyles, List, ListItem, ListItemText } from '@material-ui/core';

const drawerWidth = 240;
const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  flex: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative', 
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

const links = [
  {path: 'members', title: 'Members'},
  {path: 'check', title: 'Check certificate'},
  {path: 'assign', title: 'Assign certificate'},
  {path: 'lister', title: 'List certificates'},
  {path: 'network-addition', title: 'Add members'},
  {path: 'votes', title: 'Pending votes'}
]

const App = (props: WithStyles<typeof styles>) => {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap className={classes.flex}>
            Ethereum frontend
          </Typography>
          <AccountDisplay />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" classes={{
        paper: classes.drawerPaper
      }}>
        <div className={classes.toolbar} />
        <List>
          {links.map(link => (
            <ListItem key={link.path}>
              <Link to={link.path} >{link.title} </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path="/members" component={NetworkMembers} />
        <Route path="/check" component={CertificateChecker} />
        <Route path="/assign" component={CertificateAdder} />
        <Route path="/lister" component={CertificateLister} />
        <Route path="/network-addition" component={NetworkMemberAddition} />
        <Route path="/votes" component={VoteStatus} />
      </main>
    </div>
  );
  }

export default withStyles(styles)(App);
