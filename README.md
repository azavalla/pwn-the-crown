# Pwn the Crown

An Ethereum Ðapp using the [Open Zeppelin](https://openzeppelin.org/) framework.

Pwn the Crown is a game inspired in the [King of Ether](https://www.kingoftheether.com/).

## Try it at home

### 1. Get the source code
  ```
  $ git clone git@github.com:azavalla/pwn-the-crown.git
  ```

### 2. Install the dependencies
  ```
  $ cd pwn-the-crown
  $ npm install
  ```

### 3. Connect to the network
  Install [Metamask](https://metamask.io/), select the network you want to connect to and unlock your account.

  Optionally, you could run your own testing network. Pwn the Crown comes with [ganache-cli](https://github.com/trufflesuite/ganache-cli):
  ```
  $ npx ganache-cli
  ```

### 4. Compile the contracts
  Using the [Truffle](http://truffleframework.com/) CLI:
  ```
  $ npx truffle compile
  ```
  If you are runnign your own network, deploy the contract and save it's address, you'll need it later.
  ```
  $ npx truffle migrate
  ```

### 5. Start the web server
  ```
  $ npm start
  ```
### 6. You're all set!
  Go to `http://localhost:3000/<contract-address>/` and enjoy!
