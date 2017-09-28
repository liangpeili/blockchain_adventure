const bitcoin = require('bitcoinjs-lib');
const Client = require('bitcoin-core');

const testnet = bitcoin.networks.testnet;
const client = new Client({username: admin, password: passwd, network: 'testnet'})


function createMultisigAddress(m, pubkeys, cb) {
  client.addMultiSigAddress(m, pubkeys, (error, response) => {
    if (error) cb(error);
    cb(null, response);
  })
}


const pubkeys = ["0233ec1e186d6db1e94f09a08bf91ebb967c2eceabfa31f1ca549148816f9b22cb", "03cb18bb0afb5275935a4a2cc3fe6ebfc90e5d66e330b851af72e8d95fab418430", "025bfa0871329b14499b7aa73e3bb5407a989567458e4cb985e840ead728f25624"]
const m = 2;

createMultisigAddress(m, pubkeys, (error, response) => {
  if (error) console.log(error);
  console.log(response);
})
