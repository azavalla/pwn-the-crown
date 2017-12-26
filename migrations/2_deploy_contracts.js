const web3 = require('web3')
const Crown = artifacts.require("Crown")

module.exports = function(deployer) {
  deployer.deploy(Crown, {value: web3.utils.toWei(1, "ether") })
}
