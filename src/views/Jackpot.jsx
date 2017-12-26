import React, { Component } from 'react'

const web3 = require('web3')

class Jackpot extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { currentPrize } = this.props
    return <div className="jackpot">
        <p>Kingdom's worth:</p>
        <h1>{ this.formatMoneyUnit(currentPrize)}</h1>
    </div>
  }

  /**
   * @param {string} amount - amount of money in [Wei]
   */
  formatMoneyUnit(amount) {
    if (amount == null) return
    return `${web3.utils.fromWei(amount, "ether")} ETH`
  }

}

export default Jackpot
