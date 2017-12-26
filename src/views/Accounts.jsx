import React, { Component } from 'react'
import Network from '../network'

class Accounts extends Component {
  constructor() {
      super()
      this.state = {}
    }
  
  async componentWillReceiveProps(nextProps) {
  const accounts = await Network.getAccounts()
  this.setState({ accounts })
  }

  render() {
    return <p>{ this.state.accounts }</p>
  }
}

export default Accounts
