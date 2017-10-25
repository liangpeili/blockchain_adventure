const Web3 = require('web3');
const fs = require('fs');

const ethereumUri = 'http://localhost:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));

if (process.argv.length <= 2) {
  console.log(`Usage: node ${__filename} path-to-abi`);
  process.exit(-1);
}

const abiPath = process.argv[2];

const abi = JSON.parse(fs.readFileSync(abiPath, 'utf-8'));
const contract = web3.eth.contract(abi);
const contractInstance = contract.at('0x9e650cd9c9f12a98a4f535d1840564fdac8e0eb1');

const events = contractInstance.allEvents();

// watch for changes
events.watch(function(error, result){
  if (!error) {
    console.log(JSON.stringify(result, undefined, 2));
  }    
});
