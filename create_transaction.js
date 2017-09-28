const bitcoin = require('bitcoinjs-lib');
const Client = require('bitcoin-core');

const testnet = bitcoin.networks.testnet;
const client = new Client({username: admin, password: passwd, network: 'testnet'})

function getUnspent (address, cb) {
  const confirmation = 0;
  client.listUnspent(confirmation, (error, response) => {   
    if (error) cb(error);   
    const unspentList = response.filter(unspent => unspent.spendable === true)
                        .filter(unspent => unspent.address === address)
                        .sort((a, b) => a.amount - b.amount)
    cb(null, unspentList)
  })
}

function assembleInputTx (unspents, num, cb) {
  const unspentBalanceList = unspents.map(unspent => unspent.amount)
  console.log(unspentBalanceList)
  const totalBalance = unspentBalanceList.reduce((acc, value) => acc +value, 0)
  const min = 0.0000001
  const results = []
  if (num > totalBalance) {
    cb('Invalid amount: larger than total balance')
  } else if (num < totalBalance && num > unspentBalanceList[unspentBalanceList.length-1]) {
      let sum = unspentBalanceList[unspentBalanceList.length-1]
      let i = unspentBalanceList.length - 1;
      results.push(unspents[i])
      while (sum < num) {
        i--
        sum += unspentBalanceList[i]
        results.push(unspents[i])
      }
      cb(null, results)
  } else if (num > min && num < unspentBalanceList[unspentBalanceList.length-1]) {
      results.push(unspents.filter(unspent => unspent.amount >= num)[0])
      cb(null, results)
  } else {
      cb('Invalid amount: smaller than requires')
  }
}

function createNewTransaction(address, outputs) {
  getUnspent(address, (error, unspents) => {
    if (error) console.log(error);
    //const num = 0.9
    const num = outputs.map(output => output.amount).reduce((acc, value)=> acc+value, 0)/1e8;
    assembleInputTx(unspents, num, (error, inputTxs) => {
      const totalUnspent = inputTxs.map(input => input.amount).reduce((acc, value) => acc + value, 0)
      const txFee = 0.0001
      const changeBalance = (totalUnspent - txFee - num) * 1e8;
      outputs.push({address: address, amount: changeBalance})
      console.log(outputs);
      //console.log(inputTxs)
      const tx = new bitcoin.TransactionBuilder(testnet);
      inputTxs.map(input => {tx.addInput(input.txid, input.vout)});
      outputs.map(output => {tx.addOutput(output.address, output.amount)}); // amount in satoshis
      console.log(tx.buildIncomplete().toHex());
    })
  })
}

const outputs = [{
  address: '2NE144LmS7UAKpGm2DiTYt4uw6yMVR7jAcE', 
  amount: 100000
  },{
  address: 'mzMyiHBySwEBoaNwNTYhJsgEugPV9BxAKn',
  amount: 500000
  }]

const address = "2MxMzAUyycRPyXMYmciW4oTckFHPUbJawV4"

createNewTransaction(address, outputs)





// module.exports = buildTransaction;
