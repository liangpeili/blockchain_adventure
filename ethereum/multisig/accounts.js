const Web3 = require('web3_ipc');

const options = {
  host: '/home/liangpeili/.ethereum/testnet/geth.ipc',
  ipc:true,
  personal: true, 
  admin: false,
  debug: false
};

const web3 = Web3.create(options);

web3.personal.newAccount("password", (error, result) => {
  return new Promise((resolve, reject) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  })
})