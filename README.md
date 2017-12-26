# Pwn the Crown

An Ethereum Ðapp using the [Open Zeppelin](https://openzeppelin.org/) framework.

Pwn the Crown is a game inspired in the [King of Ether](https://www.kingoftheether.com/).

## Try it at home

### 1. Connect to the network
  Install [Metamask](https://metamask.io/), select the network you want to connect to and unlock your account.
  
  Optionally, you could deploy your own contract on a testing network. I suggest [testrpc](https://www.npmjs.com/package/ethereumjs-testrpc):
  ```
  $ npm install -g ethereumjs-testrpc
  $ testrpc
  ```
### 2. Get the source code
  ```
  $ git clone git@github.com:azavalla/pwn-the-crown.git
  ```

### 3. Install the dependencies
  ```
  $ cd pwn-the-crown
  $ npm install
  ```

### 4. Compile the contracts
  Using the [Truffle](http://truffleframework.com/) CLI:
  ```
  $ truffle compile
  ```
  If you chose to deploy your own contract, now is when you do it.
  ```
  $ truffle migrate
  ```

### 5. Start the web server
  ```
  $ npm start
  ```
### 6. You're all set!
  Go to `http://localhost:3000/<contract-address>/` and enjoy!
