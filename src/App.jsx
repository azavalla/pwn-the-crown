import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Web3 from 'web3'

import CrownApp from './views/CrownApp'

const App = () => (
  <Router>
    <Switch>
      <Route path="/:address" component={ Main }/>
      <Route component={ MissingAddress } />
    </Switch>
  </Router>
)

const Main = function({ match }) {
  let web3 = new Web3()
  let { address } = match.params

  return web3.utils.isAddress(address)
    ? <CrownApp address={ address } />
    : <MissingAddress />
}

const MissingAddress = () => (
  <p>This is not a Crown address :(</p>
)

export default App
