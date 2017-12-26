import contract from 'truffle-contract'
import Network from "./network"


export async function getCrown(address) {
  const Crown = contract(require('contracts/Crown.json'))
  const provider = await Network.provider()
  Crown.setProvider(provider)
  return Crown.at(address)
}
