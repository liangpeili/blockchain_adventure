pragma solidity ^0.4.6

contract mortal {
  address owner;

  modifier onlyowner() {
    if(owner == msg.sender) {
      _;
    } else {
      revert();
    }
  }

  function mortal() {
    owner = msg.sender;
  }

  function kill() onlyowner {
    suicide(owner);
  }
}

contract MyContract is mortal {
  uint myVariable;

  function MyContract() payable {
    myVariable = 5;
  }

  function setMyVariable(uint myNewVariable) onlyowner {
    myVariable = myNewVariable;
  }

  function getMyVariable() constant returns(uint) {
    return myVariable;
  }

  function getMyContractBalance() constant returns(uint) {
    return this.balance;
  }

  function () payable {

  }
}