import React, { Component } from 'react'
import { getCrown } from '../contracts'
import Network from '../network'


class Panel extends Component {
  constructor() {
    super()
    this.state = {}
  }

  async componentWillReceiveProps(nextProps) {
    const { currentKing, currentHeir } = nextProps.details
    const accounts = await Network.getAccounts()

    const isKing = accounts[0]
      ? currentKing === accounts[0].toLowerCase()
      : undefined

    const isHeir = accounts[0]
    ? currentHeir === accounts[0].toLowerCase()
    : undefined
    
      this.setState({ accounts, isKing, isHeir })
  }

  render() {
    const { kingIsMad, kingIsInDanger, heirCanClaimThrone} = this.props.details
    return (
      <div className="panel">

        { kingIsMad ?
          <p className="warn">KING IS MAD</p> :
          <p className="info">KING IS SANE</p>
        }

        { kingIsInDanger ?
          <p className="warn">POPULAR REVOLT</p> :
          <p className="info">PEOPLE ARE OBEDIENT</p>
        }

        { ! (this.state.isKing || this.state.isHeir)
        ? <p>
            <Button text="Claim the Crown!" onClick={ () => this.claimCrown() }>
            </Button>
          </p>
        : null
        }

          { this.state.isKing
          ? <div className="buttons">Welcome, your Majesty. <br/>
            { kingIsInDanger
            ? <div>
                <p className="warn-text">Your reign is in danger. Defend it!</p>
                  <Button text="Call the royal guard" onClick={ () => this.kingDefendThrone() }>
                  </Button>
              </div>
            : <div>
                <GreyButton text="Call the royal guard"/> <br/>
              </div>
            }
            { kingIsMad
            ? <div>
              <p>
                <Button text="Flee with all the gold" onClick={ () => this.openVaultsAndFlee() }>
                </Button>
              </p>
              </div>
            : <GreyButton text="Flee with all the gold"/>
            }
          </div>
          : null
          }

          { this.state.isHeir
          ? <div className="buttons">You are the heir to the throne<br/>
            { kingIsInDanger
            ? <GreyButton text="Start a popular demonstration"/>
            : <Button text="Start a popular demonstration" onClick={ () => this.heirClaimThrone() }>
              </Button>
            }
            <br/>
            { heirCanClaimThrone
            ? <Button text="Take the crown" onClick={ () => this.claimHeirOwnership() } >
              </Button>
            : <GreyButton text="Take the crown"/>
            }
          </div>
          : null
          }      
      </div>
      
    )
    
  }

  formatBool(bool) {
    if (bool == null) return
    return bool.toString()
  }

  async getCrown() {
    return getCrown(this.props.address)
  }

  async claimCrown() {
    const { accounts } = this.state
    const crown = await this.getCrown()
    const lastBid = await crown.lastBid()
    const nextBid = Number(lastBid) + Number(lastBid) * 10/100

    try {
      this.startLoader()
      await crown.claimCrown({ from: accounts[0], gas: 73102, value: nextBid })
      this.props.getData()
    } catch (e) {
      this.stopLoader()
      console.log(e)
    }
  }

  async kingDefendThrone() {
    const { accounts } = this.state
    const crown = await this.getCrown()
    const lastRoyalBid = await crown.lastRoyalBid()
    const nextBid = Number(lastRoyalBid) + Number(lastRoyalBid) * 10/100

    try {
      this.startLoader()
      await crown.kingDefendCrown({ from: accounts[0], gas: 30000, value: nextBid})
      this.props.getData()
    } catch (e) {
      this.stopLoader()
      console.log(e)
    }
  }

  async heirClaimThrone() {
    const { accounts } = this.state
    const crown = await this.getCrown()
    const lastRoyalBid = await crown.lastRoyalBid()
    const nextBid = Number(lastRoyalBid) + Number(lastRoyalBid) * 10/100
    
    try {
      this.startLoader()
      await crown.heirClaimCrown({ from: accounts[0], gas: 45809, value: nextBid })
      this.props.getData()
    } catch (e) {
      this.stopLoader()
      console.log(e)
    }
  }

  async openVaultsAndFlee() {
    const { accounts } = this.state
    const crown = await this.getCrown()
    try {
      this.startLoader()
      await crown.openVaultsAndFlee({ from: accounts[0], gas: 210009 })
      this.props.getData()
    } catch (e) {
      this.stopLoader()
      console.log(e)
    }
  }
  
  async claimHeirOwnership() {
    const { accounts } = this.state
    const crown = await this.getCrown()
    try {
      this.startLoader()
      await crown.claimHeirOwnership({ from: accounts[0] })
      this.props.getData()
    } catch (e) {
      this.stopLoader()
      console.log(e)
    }
  }

  startLoader() {
    this.props.setLoader(true)
  }

  stopLoader() {
    this.props.setLoader(false)
  }

}

function Button({ text, onClick, children }) {
  return <span>
    { children }
    { <a className="btn" onClick={ onClick }>{text}</a> }
  </span>
}

function GreyButton({ text, children }) {
  return <span>
    { children }
    { <a className="grey-btn">{text}</a> }
  </span>
}

export default Panel
