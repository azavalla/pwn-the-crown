import React, { Component } from 'react'

import { ContractLink } from './Links'

export default class Rules extends Component {
  render() {
    return <div className="rules">
      <h2>What's this about?</h2>
      <p>Pwn the Crown is a game inspired in the <a href="https://www.kingoftheether.com/">King of the Ether</a>. 
      It's also a deregulated smart contract living on <ContractLink address={ this.props.address }/>.
          </p>
      <h2>The Rules</h2>
      <p>1. Money makes the rules. Anyone can be queen/king as long as they beat the previous bid plus 10%. But be adviced, leading a kingdom can drive you insane.</p>
      <p>2. If someone outbids you, you get back what you deposited plus 5%. You also become the heir to the throne.</p>
      <p>3. Heirs can bribe the kingdom's citiziens to start a revolt against the queen/king. The queen/king has 12hs to restore the peace in the kingdom before the heir can claim himself as the legitimate one true ruler. Heir's bribe must beat the guards wage plus 10%.</p>
      <p>4. The queen/king can call the royal guard to repress the rebellion. Guards wage must beat the heir's bribe plus 10%.</p>
      <p>5. After ten days of nerve-racking governing, the queen/king goes mad. Had they been patient enough, the queen/king can open the castle vaults, take all the gold and flee, leaving the kingdom reduced to rubble.</p>
    </div>
  }
}
