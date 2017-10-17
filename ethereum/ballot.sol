pragma solidity ^0.4.0;
contract SplitIt {
  
  address[]  employees = [0xC0A8AcDd72BB8708f3AaE86b250F26E8Ea2ac148, 0xd0B26Bc06e3F03eec96a40e340bF50501e152773, 0x4f73dF541E257fad1B51B506cE35630CD94E9236];
  uint totalRecieved = 0;
  mapping (address => uint) withdrawnAmounts;
  
  
  function SplitIt () payable {
    updateTotalRecieved();
  }
  
  function () payable {
    updateTotalRecieved();  
  }
  
  function updateTotalRecieved () internal {
    totalRecieved += msg.value;
  }
  
  modifier canWithdraw() {
    bool contains = false;
    
    for(uint i = 0; i<employees.length; i++) {
        if (employees[i] == msg.sender) {
            contains = true;
        }
    }
    
    require(contains);
    _;
  }
  
  function withDraw() canWithdraw {
      uint amountAllocated = totalRecieved/employees.length;
      uint amountWithdrawn = withdrawnAmounts[msg.sender];
      uint amount = amountAllocated - amountWithdrawn;
      withdrawnAmounts[msg.sender] = amountWithdrawn + amount;
      
      if (amount > 0) {
          msg.sender.transfer(amount);
      }
  }
  
}
