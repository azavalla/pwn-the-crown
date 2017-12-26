import React from 'react'

function ContractLink({ address }) {
  const href = `https://etherscan.io/address/${address}`
  return <a href={ href } target="_blank">{ address }</a>
}

export { ContractLink }
