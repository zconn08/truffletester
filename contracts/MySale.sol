pragma solidity ^0.4.4;

contract MySale {
  mapping(address => uint) balance;
  uint total_coins = 1;
  function printCoin(uint howMuch) public{
  	balance[msg.sender] += howMuch;
  	total_coins += howMuch;
  }
  function allCoins() constant public returns(uint){
  	return total_coins;
  }

  function myCoin() constant public returns(uint){
   return balance[msg.sender];
  }
}
