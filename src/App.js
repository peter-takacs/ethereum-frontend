import React from 'react'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import NetworkMembers from './containers/network-members';
import CertificateChecker from './containers/certificate-checker';

const App = () => (
      <div>
        <NetworkMembers />
        <CertificateChecker />
      </div>
    );

export default App
