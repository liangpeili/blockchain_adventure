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