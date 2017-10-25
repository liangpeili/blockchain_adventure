//
// deploy.js
// simple code to deploy a single solidity contract on testrpc.
// the contract is deployed from the first account.
// 
// usage: node deploy.js path-to-abi path-to-bytecode
//
// returns: deployed contract address on success

const fs = require('fs');
const Web3 = require('web3');

const ethereumUri = 'http://localhost:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));

if (process.argv.length <= 3) {
    console.log(`Usage: node ${__filename} path-to-abi path-to-bytecode`);
    process.exit(-1);
}

const abiPath = process.argv[2];
const byteCodePath = process.argv[3];

const abi = JSON.parse(fs.readFileSync(abiPath, 'utf-8'));
const byteCode = fs.readFileSync(byteCodePath);
const contract = web3.eth.contract(abi);
const address = web3.eth.accounts[0];

web3.personal.unlockAccount(address, 'password')

contract.new({
  from: address,
  data: '0x'+ byteCode,
  gas: 4700000
  }, (err, myContract) => {
    if (!err) {
      if (!myContract.address) {
        console.log(`myContract.transactionHash = ${myContract.transactionHash}`); // The hash of the transaction, which deploys the contract
      } else {
        console.log(`myContract.address = ${myContract.address}`); // the contract address
      }
    } else {
      console.log(err);
    }
});





