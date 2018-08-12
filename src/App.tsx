import * as React from 'react'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import NetworkMembers from './containers/network-members';
import CertificateChecker from './containers/certificate-checker';
import CertificateAdder from './containers/certificate-assignment';
import AccountDisplay from './containers/account';

const App = () => (
      <div>
        <AccountDisplay />
        <NetworkMembers />
        <CertificateChecker />
        <CertificateAdder />
      </div>
    );

export default App
