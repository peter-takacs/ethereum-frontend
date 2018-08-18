import * as React from 'react'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import NetworkMembers from './containers/network-members';
import CertificateChecker from './containers/certificate-checker';
import CertificateAdder from './containers/certificate-assignment';
import AccountDisplay from './containers/account';

import { Link, Route } from 'react-router-dom';

const App = () => (
      <div>
        <nav>
          <Link to="members">Members</Link>
          <Link to="check">Check certificate</Link>
          <Link to="assign">Assign certificate</Link>
        </nav>
        <AccountDisplay />
        <Route path="/members" component={NetworkMembers}/>
        <Route path="/check" component={CertificateChecker} />
        <Route path="/assign" component={CertificateAdder} />
      </div>
    );

export default App
