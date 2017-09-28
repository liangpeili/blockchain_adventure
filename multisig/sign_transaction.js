const bitcoin = require('bitcoinjs-lib');
const Client = require('bitcoin-core');
const Buffer = require('safe-buffer').Buffer

const testnet = bitcoin.networks.testnet;
const client = new Client({username: admin, password: passwd, network: 'testnet'})

function sign(incompleteTx, privKey, redeemScript) {
  const tx = bitcoin.TransactionBuilder.fromTransaction(bitcoin.Transaction.fromHex(incompleteTx), testnet);
  tx.sign(0, privKey, redeemScript);
  return tx.inputs;
}

const incompleteTx = '0100000001407c6ce9d8c0c5db5f80d3eedd5c13e1a870866545f11f8da7be643bf27e19370100000000ffffffff03a08601000000000017a914e3ac87605b2005d1103696850354875a8dbe09d98720a10700000000001976a914ceb7d464bea4d2bd3f0b24086326ee885865c66288acb03515000000000017a914382000368d6282da05d703b20ddb387043e2d57b8700000000'
const privKey = 'cUuqqN13uRG8uUg3riGZ8opnjhiZnwhax7aq714QZxW6sUNTvBhE'
let alice = bitcoin.ECPair.fromWIF(privKey, testnet);


client.validateAddress('2MxMzAUyycRPyXMYmciW4oTckFHPUbJawV4', (error, response)  => {
  if (error) console.log(error);
  const redeemScript = Buffer.from(response.hex, 'hex')
  console.log(sign(incompleteTx, alice, redeemScript))
  console.log(redeemScript);
})

module.exports = sign;
