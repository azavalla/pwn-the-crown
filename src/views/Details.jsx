import React, { Component } from 'react'
import moment from 'moment'

import Network from '../network'
import { ContractLink } from './Links'

const web3 = require('web3')

class Details extends Component {
  constructor() {
    super()
    this.state = {}
  }

  async componentWillReceiveProps(nextProps) {
    const accounts = await Network.getAccounts()
    this.setState({ accounts })
  }


  render() {
    const { currentKing, currentHeir, lastBid, lastRoyalBid, rulingStartDate } = this.props.details
    return <div className="details">
      <div>
      <p>Current Queen/King:</p>
      <ContractLink address={ currentKing } />
      </div>

      <p>Current king ruling started on { this.formatDate(rulingStartDate) }</p>
      
      <div>
      <p>Heir to the throne:</p>
      <ContractLink address={ currentHeir }/>
      </div>
      <br/>
      
      <div>
        <p>Latest bid:</p>
        { this.formatMoneyUnit(lastBid)}
      </div>

      <div>
        <p>Latest bribe/wage:</p>
        { this.formatMoneyUnit(lastRoyalBid)}
      </div>

      <div>
      <p>Days until the king goes mad:</p>
      { this.getDaysBeforeMadness(rulingStartDate) }
      </div>

    </div>
  }

  /**
   * @param {string} amount - amount of money in [Wei]
   */
  formatMoneyUnit(amount) {
    if (amount == null) return
    return `${web3.utils.fromWei(amount, "ether")} ETH`
  }

  getDaysBeforeMadness(date) {
    if (! date) return
    // days_left = start_date + 10 days - now
    const seconds_left = Number(date) + 864000 - Math.round(new Date() / 1000)
    const days_left = seconds_left / (60 * 60 * 24)
    return Math.ceil(days_left)
  }

  formatBool(bool) {
    if (bool == null) return
    return bool.toString()
  }

  formatDate(date) {
    if (! date) return
    const milliseconds = date * 1000
    return moment(milliseconds).format("dddd, MMMM Do YYYY, h:mm:ss a")
  }

  startLoader() {
    this.props.setLoader(true)
  }

  stopLoader() {
    this.props.setLoader(false)
  }
}





export default Details
