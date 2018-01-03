import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Web3 from 'web3'
import Network from './network'
import Spinner from './views/Spinner'

import CrownApp from './views/CrownApp'

const App = () => (
  <Router>
    <Switch>
      <Route path="/:address" component={ Main }/>
      <Route component={ MissingAddress } />
    </Switch>
  </Router>
)

class Main extends React.Component {
  constructor() {
    super()
    this.state = { networkReady: false }
  }

  componentDidMount() {
    this.getNetworkState()
  }

  render() {
    let web3 = new Web3()
    let { address } = this.props.match.params
    console.log(this.state.networkReady)
    return (
      <div>
        { this.state.networkReady ?
          null :
          <div className="metamask-warning">
            <h2>Waiting for Metamask to be ready...</h2>
            <h2>Make sure you have Metamask installed and your account is unlocked...</h2>
            <Spinner/>
          </div>
        }
        { !web3.utils.isAddress(address) ?
          <MissingAddress /> :
          this.state.networkReady ?
            <CrownApp address={ address } /> :
            null
        }
      </div>
    )
  }

  async getNetworkState() {
    const accounts = await Network.getAccounts()
    const accountsReady = accounts ? accounts.length !== 0 : true
    const metamaskRunning = window.web3 ? window.web3.currentProvider.isMetaMask : false
    this.setState({
      networkReady: metamaskRunning && accountsReady
    })
  }
}

const MissingAddress = () => (
  <p>This is not a Crown address :(</p>
)

export default App
