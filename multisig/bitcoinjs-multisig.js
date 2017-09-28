var bitcoin = require('bitcoinjs-lib');
var testnet = bitcoin.networks.testnet;


const users = [];

// Generate three keypairs and addresses
for (let i=0; i<3; i++) {
  const user = {}
  let keyPair = new bitcoin.ECPair.makeRandom({network:testnet});
  user.privateKey = keyPair.toWIF();
  user.publicKey = keyPair.Q.getEncoded().toString('hex')
  user.address = keyPair.getAddress();
  users.push(user);
}

console.log(users)




// Generate a 2-of-3 address and redeemScript

var pubKeys = users.map(user => user.publicKey).map(function (x) { return x.getPublicKeyBuffer() })
  
var redeemScript = bitcoin.script.multisig.output.encode(2, pubKeys)
var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
var address = bitcoin.address.fromOutputScript(scriptPubKey, testnet)

console.log(address)


// Create a transaction
var tx = new bitcoin.TransactionBuilder(testnet);

// Add input
// [previous transaction hash, index of the output to use]
var txId = '04839f5905aa363d18aff5b559892bb54ddf4e0c7066a7072b942d71f2fa9470';
tx.addInput(txId, 0);

// Add output
// [payee's address, amount in satoshis] 
tx.addOutput(address, 60000);

// Initialize a private key using WIF
var privateKeyWIF = 'cNBMhAS7ayhRVUosXST8GsKi9tT8xzpnuDLaedGSL448sF8bySq1';
var fromKeyPair = bitcoin.ECPair.fromWIF(privateKeyWIF, testnet);

// Sign the first input with the new key
tx.sign(0, fromKeyPair);

// Print transaction serialized as hex
console.log(tx.build().toHex());

// Push to the testnet
// https://live.blockcypher.com/btc-testnet/pushtx/
// blockchain.t.transactions.propagate(tx.build().toHex(), done)
// Use this: https://blockchain.info/pushtx
//https://blockr.io/tx/push
/*
      dhttp({
        method: 'POST',
        url: 'https://api.ei8ht.com.au:9443/3/pushtx',
//          url: 'http://tbtc.blockr.io/api/v1/tx/push',
        body: tx.build().toHex()
      }, done)
*/




// Spend the multisig address's balance
var keyPairs = [
    'cUeEXDzdHt5NmKjTJChgL1okGLvzeo7NzmoPyxRThzPVRgoQT9T8',
    'cTMHppSZNfogdNhUz11RhfYcYnxsfK7MYUfuRGo9mdgvWY9XBacB',
    'cQyjL79zGwAFi8BDa67NAz2yzwbjYtWEmyX3n6FbtFpzXiUC7NCr'
  ].map(function (wif) { return bitcoin.ECPair.fromWIF(wif, testnet) })


var pubKeys = keyPairs.map(function (x) { return x.getPublicKeyBuffer() })
  
var redeemScript = bitcoin.script.multisig.output.encode(2, pubKeys)
var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript))
var address = bitcoin.address.fromOutputScript(scriptPubKey, testnet)


let alice = bitcoin.ECPair.fromWIF('cUeEXDzdHt5NmKjTJChgL1okGLvzeo7NzmoPyxRThzPVRgoQT9T8', testnet);
let bob = bitcoin.ECPair.fromWIF('cTMHppSZNfogdNhUz11RhfYcYnxsfK7MYUfuRGo9mdgvWY9XBacB', testnet);

let tx = new bitcoin.TransactionBuilder(testnet);

tx.addInput('061eefa78419504bd97bb2672d61fe10fa99ade5a5a72b38b7183ed9c18ef5f6', 0);
tx.addOutput('n1Mgodk5eJ6QaDMh8BUPBUygAExYNc4VMQ', 40000);

tx.sign(0, alice, redeemScript);
tx.sign(0, bob, redeemScript);
console.log(tx.build().toHex());




