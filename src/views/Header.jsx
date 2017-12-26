import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Network from '../network'

function CrownAddress({ address }) {
  return <p className="crown-address" align="left">Crown: {address}</p>
}

class UserAddress extends Component {
  constructor() {
    super()
    this.state = {}
  }
  
  async componentWillReceiveProps(nextProps) {
    const account = (await Network.getAccounts())[0]
    const web3 = await Network.web3()
    const balance = web3.utils.fromWei(await Network.getBalance(account), 'ether')
    this.setState({ account, balance })
  }
  
  render() {
  return <div className="user-address">
    <p>You: {this.state.account}</p>
    <p>Balance: {this.state.balance} ETH</p>
  </div>
  }
}

class Header extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <div className="address-bar">
          <Grid>
            <Row>
              <Col xs={12} md={6}>
                <CrownAddress address={this.props.address}/>
              </Col>
              <Col xs={12} md={6}>
                <UserAddress/>
              </Col>
            </Row>
          </Grid>
        </div>
        <Grid className="header">
          <Col xs={12}>
            <a target="_blank" href="https://openzeppelin.org" rel="noopener noreferrer">
              <img className="logo hidden-xs hidden-sm" src="/logo-zeppelin.png" alt="OpenZeppelin logo" />
            </a>
            <nav>
              <a className="navbar-right" href="https://github.com/azavalla/pwn-the-crown/">Github</a>
            </nav>
          </Col>
        </Grid>
      </div>
    )
  }
}

export default Header
