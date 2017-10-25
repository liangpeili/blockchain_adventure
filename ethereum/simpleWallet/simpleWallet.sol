pragma solidity ^0.4.15;

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

  mapping(address => Permission) permittedAddresses; 

  event someoneAddedSomeoneToTheSendersList(address thePersonWhoAdded, address thePersonWhoIsAllowedNow, uint thisMuchHeCanSend);

  struct Permission {
    bool isAllowed;
    uint maxTransferAmount;
  }

  function addAddressToSendersList(address permitted, uint maxTransferAmount) onlyowner {
    permittedAddresses[permitted] = Permission(true, maxTransferAmount);
    someoneAddedSomeoneToTheSendersList(msg.sender, permitted, maxTransferAmount);
  }

  function sendFunds(address receiver, uint amountInWei) {
    if(permittedAddresses[msg.sender].isAllowed) {
      if(permittedAddresses[msg.sender].maxTransferAmount >= amountInWei) {
        bool isTheAmountReallySent = receiver.send(amountInWei);
        if(!isTheAmountReallySent) {
          revert();
        }
      } else {
        revert();
      }
    } else {
      revert();
    }
  }

  function removeAddressFromSendersList(address theAddress) {
    delete permittedAddresses[theAddress];
  }

  function () payable {

  }
}