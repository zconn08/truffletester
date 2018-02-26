import React, { Component } from 'react'
import MySale from '../build/contracts/MySale.json'
import getWeb3 from './utils/getWeb3'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
const contract = require('truffle-contract')
const mySale = contract(MySale)
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      storageValue: 0,
      web3: null
    }
  }
  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }
  coinCount(){
    mySale.setProvider(this.state.web3.currentProvider)
    var mySaleInstance
    console.log("...getting data");
    this.state.web3.eth.getAccounts((error, accounts) => {
      mySale.deployed().then((instance) => {
        mySaleInstance = instance
        return mySaleInstance.allCoins.call({from: accounts[0]})
      }).then((result) => {
        console.log("result", result);
      })
    })
  }
  printCoin(){
    mySale.setProvider(this.state.web3.currentProvider)
    var mySaleInstance
    console.log("...setting data");
    this.state.web3.eth.getAccounts((error, accounts) => {
      mySale.deployed().then((instance) => {
        mySaleInstance = instance
        return mySaleInstance.printCoin(4, {from: accounts[0]})
      }).then((result) => {
        console.log("result", result);
      })
    })
  }

  getMyBalance(){
    mySale.setProvider(this.state.web3.currentProvider)
    var mySaleInstance
    console.log("Getting my balance");
    this.state.web3.eth.getAccounts((error, accounts) => {
      mySale.deployed().then((instance) => {
        mySaleInstance = instance
        return mySaleInstance.myCoin({from: accounts[0]});
      }).then((result) => {
        document.getElementById("balance").innerHTML = result["c"][0]
        console.log("result", result);
      })
    })
  }

  render() {
    return (
      <div>
        <div id="get" onClick={this.coinCount.bind(this)}></div>
        <div id="set" onClick={this.printCoin.bind(this)}></div>
        <div id="get-balance-button" onClick={this.getMyBalance.bind(this)}>Get Balance</div>
        <div id="balance">N/A</div>
      </div>
    );
  }
}
export default App
