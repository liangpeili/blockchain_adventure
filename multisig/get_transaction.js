const bitcoin = require('bitcoinjs-lib');
const Client = require('bitcoin-core');

const testnet = bitcoin.networks.testnet;
const client = new Client({username: admin, password: passwd, network: 'testnet'})

function getTransactionHistory(address) {
  client.listTransactions((error, response) => {
    if (error) console.log(error);
    console.log(response.filter(transaction => transaction.address === address));
  })
}

const address = '2MxMzAUyycRPyXMYmciW4oTckFHPUbJawV4'
getTransactionHistory(address)
