import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import { getCrown } from '../contracts'

import Header from './Header'
import Jackpot from './Jackpot'
import Details from './Details'
import Panel from './Panel'
import Rules from './Rules'
import Spinner from './Spinner'

import '../stylesheets/CrownApp.css'


class CrownApp extends Component {
  constructor() {
    super()
    this.state = { loading: true }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { address } = this.props
    return (
      <div className="CrownApp">

        { this.state.loading ? <Spinner /> : null }

        <Header address={ address } />

        <div>
          <h1>PWN. THE. CROWN.</h1>
        </div>
        
        <Jackpot currentPrize={this.state.currentPrize}/>
        <br/>
        <Grid>
          <Row>
            <Col xs={12} md={6}>
              <Details
                address={ address }
                details={ this.state }
                getData={ () => this.getData() }
                setLoader={ x => this.setLoader(x) }
              />
            </Col>
            <Col xs={12} md={6}>
              <Panel
                address={ address }
                details={ this.state }
                getData={ () => this.getData() }
                setLoader={ x => this.setLoader(x) }
              />
            </Col>
          </Row>
        </Grid>

        <Rules address={ address }/>

      </div>
    )
  }

  setLoader(loading) {
    this.setState({ loading })
  }

  async getData() {
    const { address } = this.props
    const crown = await getCrown(address)

    this.setState({
      currentPrize: await crown.getCurrentPrize(),
      currentKing: await crown.owner(),
      currentHeir: await crown.heir(),
      lastBid: await crown.lastBid(),
      lastRoyalBid: await crown.lastRoyalBid(),
      rulingStartDate: await crown.currentKingRulingStartDate(),
      kingIsMad: await crown.kingIsMad(),
      kingIsInDanger: await crown.kingIsInDanger(),
      heirCanClaimThrone: await this.heirCanClaimThrone(crown),
      loading: false
    })
  }
  async heirCanClaimThrone(crown) {
    const timeOfDeath = await crown.timeOfDeath()
    const heartbeatTimeout = await crown.heartbeatTimeout()
    const now = Math.round(new Date() / 1000)
    return Number(timeOfDeath) !== 0 && now >= Number(timeOfDeath.plus(heartbeatTimeout))
  }
}


export default CrownApp
