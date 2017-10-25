const Web3 = require('web3');

const ethereumUri = 'http://localhost:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(ethereumUri));

if(!web3.isConnected()){
  throw new Error('unable to connect to ethereum node at ' + ethereumUri);
}else{
  console.log('connected to ethereum node at ' + ethereumUri);
  let accounts = web3.eth.accounts;
  console.log(accounts);
}

function getCoinbaseBalance() {
  let coinbase = web3.eth.coinbase;
  console.log('coinbase:' + coinbase);
  let balance = web3.eth.getBalance(coinbase);
  console.log('balance:' + web3.fromWei(balance, 'ether') + " ETH");
}

// getCoinbaseBalance()