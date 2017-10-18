const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

/*
* connect to ethereum node
*/ 
const ethereumUri = 'http://localhost:8545';
const address = '0x8D51C4adbB31d17ee662342bb9D4F677F4FA7a3F';

let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));

if(!web3.isConnected()){
  throw new Error('unable to connect to ethereum node at ' + ethereumUri);
}else{
  console.log('connected to ethereum node at ' + ethereumUri);
  let coinbase = web3.eth.coinbase;
  console.log('coinbase:' + coinbase);
  let balance = web3.eth.getBalance(coinbase);
  console.log('balance:' + web3.fromWei(balance, 'ether') + " ETH");
  let accounts = web3.eth.accounts;
  console.log(accounts);

  if (web3.personal.unlockAccount(address, 'password')) {
    console.log(`${address} is unlocked`);
  }else{
    console.log(`unlock failed, ${address}`);
  }
}

/*
* Compile Contract and Fetch ABI, bytecode
*/ 
let sourceCode = fs.readFileSync("./contracts/BasicToken.sol", 'utf8');
console.log('compiling contract...');
let compiledContract = solc.compile(sourceCode);
console.log('done');
for (let contractName in compiledContract.contracts) {
  // code and ABI that are needed by web3 
  // console.log(contractName + ': ' + compiledContract.contracts[contractName].bytecode);
  // console.log(contractName + '; ' + JSON.parse(compiledContract.contracts[contractName].interface));
  var bytecode = compiledContract.contracts[contractName].bytecode;
  var abi = JSON.parse(compiledContract.contracts[contractName].interface);
}

console.log(JSON.stringify(abi, undefined, 2));
console.log(bytecode);

/*
* deploy contract
*/ 
let gasEstimate = web3.eth.estimateGas({data: '0x' + bytecode});
console.log('gasEstimate = ' + gasEstimate);

let MyContract = web3.eth.contract(abi);
console.log('deploying contract...');

let myContractReturned = MyContract.new([], {
  from: address,
  data: '0x'+ bytecode,
  gas: gasEstimate + 50000
  }, function (err, myContract) {
    if (!err) {
        // NOTE: The callback will fire twice!
        // Once the contract has the transactionHash property set and once its deployed on an address.
      
        // e.g. check tx hash on the first call (transaction send)
      if (!myContract.address) {
        console.log(`myContract.transactionHash = ${myContract.transactionHash}`); // The hash of the transaction, which deploys the contract
          
        // check address on the second call (contract deployed)
      } else {
        console.log(`myContract.address = ${myContract.address}`); // the contract address
        global.contractAddress = myContract.address;
      }
      
        // Note that the returned "myContractReturned" === "myContract",
        // so the returned "myContractReturned" object will also get the address set.
    } else {
      console.log(err);
    }
});

(function wait () {
    setTimeout(wait, 1000);
})();


//https://medium.com/taipei-ethereum-meetup/%E4%BD%BF%E7%94%A8node-js%E9%83%A8%E7%BD%B2%E6%99%BA%E8%83%BD%E5%90%88%E7%B4%84-smart-contract-520534305aaf



