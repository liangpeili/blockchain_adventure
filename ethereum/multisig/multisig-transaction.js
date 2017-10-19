const Web3 = require('web3');
const ethereumUri = 'http://localhost:8545';
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));
const abi = require('./multisig-abi.json');

const MyContract = web3.eth.contract(abi);
const myContractInstance = MyContract.at('0xD138C1E3F6CcAFaa9E2235837EB049D371C0A745');

let address = web3.eth.accounts[0]

if (web3.personal.unlockAccount(address, 'password')) {
  console.log(`${address} is unlocked`);
}else{
  console.log(`unlock failed, ${address}`);
}

h = myContractInstance.execute(web3.eth.accounts[2], web3.toWei(12, "ether"), web3.toHex('send some money'), {from: address});
console.log(h)