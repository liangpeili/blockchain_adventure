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

contract SimpleWallet is mortal {

  mapping(address => Permission) myAddressMapping; 

  struct Permission {
    bool isAllowed;
    uint maxTransferAmount;
  }

  function addAddressToSendersList(address permitted, uint maxTransferAmount) onlyowner {
    myAddressMapping[permitted] = Permission(true, maxTransferAmount);
  }

  function sendFunds(address receiver, uint amountInWei) {
    if(myAddressMapping[msg.sender].isAllowed) {
      if(myAddressMapping[msg.sender].maxTransferAmount <= amountInWei) {
        bool isTheAmountReallySent = receiver.send(amountInWei);
        if(!isTheAmountReallySent) {
          revert();
        }
      }
    }
  }

  function () payable {

  }
}