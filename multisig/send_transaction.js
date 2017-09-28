const Client = require('bitcoin-core');
const client = new Client({username: 'admin', password: 'password', network: 'testnet'})

// const txHex = '0200000001c086be0308b04a5580bcd1029a2bf1b36e80c8702ca7d522d2964626d3e4678c00000000fdfd0000483045022100e1bdf233e54abbbf22adc4bc70ba531ea35fc72c0240c32f2b7a164769470201022072dc47ddf230e77279a27732b1f5cfe8a1a8e32063fc8708270fbad3116a157e0147304402204c5eebfbaba5c8bb899b737f50919c31cd27650e96c0fb6ad7d22d02bc126cb5022014d7a7a4046372b2772fe37b8a8b82104828a89ddbcfc140cb9b52ba9b04e460014c69522103b91ff254ae3bb3861e4a6c16ab356d6c52ccfd2b58bedf0dda84657dfd9d9afc21039f1475fb37d91ed65765c897acbdc37da3a7aba19f5b8ad5ff22a994e835079821030ee8793fa2cb93f0cfd475b990cbaa48a28d83bd8f434348607368e52644febf53aeffffffff0180380100000000001976a914d9a1d77497c0009446316a05c491c55d7ccdd67a88ac00000000'

const txHex = '0100000001407c6ce9d8c0c5db5f80d3eedd5c13e1a870866545f11f8da7be643bf27e193701000000fdfe0000483045022100e371b24967595379033b255debbdb31e755271efefdb29ee6311f33b5e975c6102202b235b9819455479e04bcf3996797cbb94f6bb71118e195c0e4b4210e4dc0d27014830450221008a285b757375b8b51b30f2f671bd3fe3c0daa0806cc12c72efeada1d998918f402207418f1d5bab3865ff0fb1f28800490f0d6f3f48f411cedef93c2414d2a048c7f014c6952210233ec1e186d6db1e94f09a08bf91ebb967c2eceabfa31f1ca549148816f9b22cb2103cb18bb0afb5275935a4a2cc3fe6ebfc90e5d66e330b851af72e8d95fab41843021025bfa0871329b14499b7aa73e3bb5407a989567458e4cb985e840ead728f2562453aeffffffff03a08601000000000017a914e3ac87605b2005d1103696850354875a8dbe09d98720a10700000000001976a914ceb7d464bea4d2bd3f0b24086326ee885865c66288acb03515000000000017a914382000368d6282da05d703b20ddb387043e2d57b8700000000'

client.sendRawTransaction(txHex, (error, response) => {
  if (error) console.log(error);
  console.log(response);
});