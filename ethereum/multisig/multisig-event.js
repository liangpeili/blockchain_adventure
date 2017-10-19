const Web3 = require('web3');
const ethereumUri = 'http://localhost:8545';
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));
const abi = require('./multisig-abi.json');

const MyContract = web3.eth.contract(abi);
const myContractInstance = MyContract.at('0xb7feffd5a96c122b1633b99a6f1f18ae3d691112');

const event = myContractInstance.Deposit();

// watch for changes
event.watch(function(error, result){
  if (!error) {
    console.log(result);
  }    
});
