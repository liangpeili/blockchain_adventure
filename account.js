const bitcoin = require('bitcoinjs-lib');
const Client = require('bitcoin-core');

const testnet = bitcoin.networks.testnet;
const client = new Client({username: 'admin', password: 'password', network: 'testnet'})

function generateAccount(options, cb) {
  const account = {}
  const keyPair = new bitcoin.ECPair.makeRandom(options);
  account.privateKey = keyPair.toWIF();
  account.publicKey = keyPair.Q.getEncoded().toString('hex')
  account.address = keyPair.getAddress();
  cb(null, account);
}

function importToWallet(privateKey, cb) {
  client.importPrivKey(privateKey, "", false, (error, response) => {
    if (error) cb(error);
    cb(null, response);
  })
}

generateAccount({network:testnet}, (error, account) => {
  console.log(account.address)
  importToWallet(account.privateKey, (error, response) => {
    if (error) console.log(error);
    console.log(response);
  })
});


// module.exports = generateAddress;
