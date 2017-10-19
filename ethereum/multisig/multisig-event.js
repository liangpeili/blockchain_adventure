const Web3 = require('web3');
const ethereumUri = 'http://localhost:8545';
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));
const abi = require('./multisig-abi.json');

const MyContract = web3.eth.contract(abi);
const myContractInstance = MyContract.at('0xD138C1E3F6CcAFaa9E2235837EB049D371C0A745');

const events = myContractInstance.allEvents();

// watch for changes
events.watch(function(error, result){
  if (!error) {
    console.log(JSON.stringify(result, undefined, 2));
  }    
});
