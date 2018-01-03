'use strict'

import expectThrow from 'zeppelin-solidity/test/helpers/expectThrow'
import increaseTime from 'zeppelin-solidity/test/helpers/increaseTime'

const Crown = artifacts.require('./contracts/Crown.sol')
const BALANCE = 1;
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'


contract('Crown', function(accounts) {
  let crown
  let king
  let heir
  let lastBid
  let lastRoyalBid
  let heartbeatTimeout
  
  beforeEach(async function() {
    crown = await Crown.new({value: web3.toWei(BALANCE, 'ether')})
    king = await crown.owner()
    heir = await crown.heir()
    lastBid = Number(await crown.lastBid())
    lastRoyalBid = Number(await crown.lastRoyalBid())
    heartbeatTimeout = Number(await crown.heartbeatTimeout())
  })

  it('crown gets constructed nice and easy', async function(){
    assert(
      king === accounts[0],
      "King should be set."
    )
    assert(
      heir === NULL_ADDRESS,
      "Heir should be the null address."
    )
    assert(
      Number(web3.fromWei(await web3.eth.getBalance(Crown.address), 'ether')) === BALANCE,
      `Balance should be ${BALANCE} ether`
    )
    assert.notStrictEqual(Number(await crown.currentKingRulingStartDate()), 0)
  })

  it('can be claimed', async function() {
    const cheapCandidate = accounts[1]
    const forthcomingKing = accounts[2]
    const yetAnotherRuler = accounts[3]
    const firstKingDate = await crown.currentKingRulingStartDate()

    // Can't claim if the bid is not high enough
    await expectThrow(crown.claimCrown({from: cheapCandidate, value: lastBid}))
    
    // Can claim if bid is greater than or equal the last one plus 10%
    await crown.claimCrown({from: forthcomingKing, value: lastBid + lastBid * 10/100})
    
    lastBid = Number(await crown.lastBid())
    // Can be subsequently claimed
    await crown.claimCrown({from: yetAnotherRuler, value: lastBid + lastBid * 10/100})

    assert(
      await crown.owner() === yetAnotherRuler
    )
    assert(
      await crown.heir() === forthcomingKing,
      "new heir should be the previous king"
    )
    assert(
      Number(await crown.timeOfDeath()) === 0,
      "king should be alive"
    )
    assert(
      Number(firstKingDate) <= Number(await crown.currentKingRulingStartDate()),
      "current king ruling start date should be greater than previous one"
    )
  })
  
  it('heir can claim', async function() {
    // Only heir can heirAttackCrown
    await expectThrow(crown.heirAttackCrown({from: accounts[4], value: lastRoyalBid + lastRoyalBid * 10/100}))
    
    await crown.claimCrown({from: accounts[1], value: lastBid + lastBid * 10/100})
    heir = king
    
    await crown.heirAttackCrown({from: heir, value: lastRoyalBid + lastRoyalBid * 10/100})
  })

  it('king can defend', async function() {
    await crown.claimCrown({from: accounts[1], value: lastBid + lastBid * 10/100})
    heir = king
    king = accounts[1]
    
    await crown.heirAttackCrown({from: heir, value: lastRoyalBid + lastRoyalBid * 10/100})
    lastRoyalBid = Number(await crown.lastRoyalBid())
    await crown.kingDefendCrown({from: king, value: lastRoyalBid + lastRoyalBid * 10/100})
    assert(! await crown.kingIsInDanger())
  })

  it('heir can claim ownership if king did not defend', async function() {
    await crown.claimCrown({from: accounts[1], value: lastBid + lastBid * 10/100})
    heir = king
    king = accounts[1]

    await crown.heirAttackCrown({from: heir, value: lastRoyalBid + lastRoyalBid * 10/100})

    // Not just yet
    await expectThrow(crown.claimHeirOwnership({from: heir}))
    
    // heir can claim ownership only after 12 hours of claiming
    await increaseTime(43200)
    await crown.owner()
    await crown.claimHeirOwnership({from: heir})
    assert(await crown.owner() === heir)
  })

  it('king can take the gold if he goes mad', async function() {
    await expectThrow(crown.openVaultsAndFlee())

    // king must wait for 10 days
    await increaseTime(864000)
    await crown.openVaultsAndFlee()
  })

  it('king cant cheat', async function() {
    await crown.claimCrown({from: accounts[1], value: lastBid + lastBid * 10/100})
    heir = king
    king = accounts[1]

    await crown.heirAttackCrown({from: heir, value: lastRoyalBid + lastRoyalBid * 10/100})
    assert(await crown.kingIsInDanger(), 'king should be in danger')
    await crown.heartbeat({from: king})
    assert(await crown.kingIsInDanger(), 'king should still be in danger')
  })
  
  it('heir cant cheat', async function() {
    await crown.claimCrown({from: accounts[1], value: lastBid + lastBid * 10/100})
    heir = king
    king = accounts[1]
  
    assert(! await crown.kingIsInDanger(), 'king should not be in danger')
    await crown.proclaimDeath({from: heir})
    assert(! await crown.kingIsInDanger(), 'still, king should not be in danger')
  })
})
