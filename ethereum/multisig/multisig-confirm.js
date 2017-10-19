const Web3 = require('web3');
const ethereumUri = 'http://localhost:8545';
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));
const abi = require('./multisig-abi.json');

const MyContract = web3.eth.contract(abi);
const myContractInstance = MyContract.at('0xD138C1E3F6CcAFaa9E2235837EB049D371C0A745');

let address = web3.eth.accounts[1];

var confirmationNeededEvent = myContractInstance.ConfirmationNeeded();
confirmationNeededEvent.watch(function(error, result) {
  console.log(JSON.stringify(result));
  console.log("operation: " + result.args.operation);
  console.log("data: " + result.args.data);
  console.log("blockNumber: " + result.blockNumber);
  if (web3.personal.unlockAccount(address, 'password')) {
    console.log(`${address} is unlocked`);
  }else{
    console.log(`unlock failed, ${address}`);
  }
  myContractInstance.confirm(result.args.operation, {from: address});
});
//confirmationNeededEvent.stopWatching();

// {"address":"0xb58cb29c4689661498986ce80157c899507edc4b","args":{"data":"0x","initiator":"0x000d1009bd8f0b1301cc5edc28ed1222a3ce671e","operation":"0xc801d42930eefb7a6d3dc64afbdc761e60dd843876810750f4b290b09cdbb68e","to":"0x0036f6addb6d64684390f55a92f0f4988266901b","value":"15000000000000000000"},"blockHash":"0xba7082ec03d91c83631d0d6b667c21574692fdada0d8a66ff8fd3ab92f99643d","blockNumber":20160,"event":"ConfirmationNeeded","logIndex":1,"removed":false,"transactionHash":"0xdd0d348d84afc5176ff6a220101ca3f1a6ed26887ad1aaeb04fee1bd1d21927f","transactionIndex":0}
// operation: 0xc801d42930eefb7a6d3dc64afbdc761e60dd843876810750f4b290b09cdbb68e
// data: 0x
// blockNumber: 20160

// confirm("0xc801d42930eefb7a6d3dc64afbdc761e60dd843876810750f4b290b09cdbb68e")









