const Web3 = require('web3_ipc');
const fs = require('fs');
const solc = require('solc');
const abi = require('./multisig-abi.json');


const options = {
  host: '/home/liangpeili/.ethereum/testnet/geth.ipc',
  ipc:true,
  personal: true, 
  admin: false,
  debug: false
};

const web3 = Web3.create(options);

const generateAccount = (password) => {
  web3.personal.newAccount(password, (error, result) => {
    return new Promise((resolve, reject) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  })
} 

const deployMultisigContract = (m, accounts, password) => {
  if (!web3.isConnected()) {
    throw new Error('unable to connect to ethereum node ');
  } else {
    if (web3.personal.unlockAccount(accounts[0], password)) {
      console.log(`${address} is unlocked`);
    } else {
      console.log(`unlock failed, ${accounts[0]}`);
    }
  }
  /*
  * Compile Contract and Fetch ABI, bytecode
  */ 
  const sourceCode = fs.readFileSync("./multisig.sol", 'utf8');
  console.log('compiling contract...');
  const compiledContract = solc.compile(sourceCode);
  console.log('done');
  
  const bytecode = compiledContract.contracts[':Wallet'].bytecode;
  const abi = JSON.parse(compiledContract.contracts[':Wallet'].interface);
  console.log(JSON.stringify(abi, undefined, 2));
  /*
  * deploy contract
  */ 
  const gasEstimate = web3.eth.estimateGas({data: '0x' + bytecode});
  console.log(`gasEstimate = ${gasEstimate}`);
  
  const MyContract = web3.eth.contract(abi);
  console.log('deploying contract...');
  
  const _owners = accounts;
  const _required = m;
  const _daylimit = 0;
  
  const myContractReturned = MyContract.new(_owners, _required, _daylimit, {
    from: accounts[0],
    data: '0x'+ bytecode,
    gas: 4700000
    }, (error, myContract) => {
      if (!error) {
        if (!myContract.address) {
          console.log(`myContract.transactionHash = ${myContract.transactionHash}`); // The hash of the transaction, which deploys the contract
        } else {
          console.log(`myContract.address = ${myContract.address}`); // the contract address
          global.contractAddress = myContract.address;
        }
      } else {
        console.log(error);
      }
  })
}

const createNewTransaction = (contractAddress, fromAddress, password, toAddress, amount) => {
  const MyContract = web3.eth.contract(abi);
  const myContractInstance = MyContract.at('0xD138C1E3F6CcAFaa9E2235837EB049D371C0A745');
  let address = fromAddress;
  if (web3.personal.unlockAccount(address, password)) {
    console.log(`${address} is unlocked`);
  }else{
    console.log(`unlock failed, ${address}`);
  }
  
  let txId = myContractInstance.execute(toAddress, web3.toWei(amount, "ether"), web3.toHex('send some money'), {from: address, gas: 1000000});
  console.log(txId)
}

const confirmTransaction = (contractAddress, account, password) => {
  const MyContract = web3.eth.contract(abi);
  const myContractInstance = MyContract.at(contractAddress);
  
  const confirmationNeededEvent = myContractInstance.ConfirmationNeeded();
  confirmationNeededEvent.watch((error, result) => {
    console.log(JSON.stringify(result));
    console.log("operation: " + result.args.operation);
    console.log("data: " + result.args.data);
    console.log("blockNumber: " + result.blockNumber);
    if (web3.personal.unlockAccount(account, password)) {
      console.log(`${account} is unlocked`);
    }else{
      console.log(`unlock failed, ${account}`);
    }
    myContractInstance.confirm(result.args.operation, {from: account});
  });
}