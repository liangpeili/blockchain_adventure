const bitcoin = require('bitcoinjs-lib');
const testnet = bitcoin.networks.testnet;
const sign = require('./sign_transaction')
const Client = require('bitcoin-core');

const client = new Client({username: admin, password: passwd, network: 'testnet'})


function getSignatures(inputs) {
  // get complete signature from inputs
  const keys = [];
  function keyAppend(key) {
    for (let i=0; i<key.length; i++) {
      keys[i] = key[i] || keys[i];
    }
    return keys;
  }
  const signatures = inputs.map(input => input[0].signatures); 
  signatures.map(sign => keyAppend(sign));
  return keys;
}

function buildTransaction(incompleteTx, inputs) {
  const signatures = getSignatures(inputs); 
  const tx = bitcoin.TransactionBuilder.fromTransaction(bitcoin.Transaction.fromHex(incompleteTx), testnet);
  tx.inputs = inputs[0];  // extract the first element of input
  tx.inputs[0].signatures = signatures;
  // console.log(tx.build().toHex()); 
  return tx.build().toHex();
}

const incompleteTx = '0100000001407c6ce9d8c0c5db5f80d3eedd5c13e1a870866545f11f8da7be643bf27e19370100000000ffffffff03a08601000000000017a914e3ac87605b2005d1103696850354875a8dbe09d98720a10700000000001976a914ceb7d464bea4d2bd3f0b24086326ee885865c66288acb03515000000000017a914382000368d6282da05d703b20ddb387043e2d57b8700000000'
const privKey1 = 'cUuqqN13uRG8uUg3riGZ8opnjhiZnwhax7aq714QZxW6sUNTvBhE'
const alice = bitcoin.ECPair.fromWIF(privKey1, testnet);
const privKey2 = 'cPU2Wwagv4u7iJL3M1FtDpKXCQieZoopTAsAJyVG191me8fe252X'
const bob = bitcoin.ECPair.fromWIF(privKey2, testnet); 


client.validateAddress('2MxMzAUyycRPyXMYmciW4oTckFHPUbJawV4', (error, response)  => {
  if (error) console.log(error);
  const redeemScript = Buffer.from(response.hex, 'hex')
  const input1 = sign(incompleteTx, alice, redeemScript)
  const input2 = sign(incompleteTx, bob, redeemScript)
  const inputs = [input1, input2]
  console.log(buildTransaction(incompleteTx, inputs))
})




module.exports = buildTransaction;



