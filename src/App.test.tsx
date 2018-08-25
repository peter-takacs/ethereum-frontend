import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import * as renderer from 'react-test-renderer';

describe('App component', () => {

  it('Renders correctly', () => {
    const tree = renderer
      .create(<App/>)
      .toJSON();
    
  })

})
