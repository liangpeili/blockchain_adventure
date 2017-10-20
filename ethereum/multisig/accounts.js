var web3_extended = require('web3_ipc');

var options = {
  host: '/home/liangpeili/.ethereum/testnet/geth.ipc',
  ipc:true,
  personal: true, 
  admin: false,
  debug: false
};

var web3 = web3_extended.create(options);

web3.personal.newAccount("password",function(error,result){
    if (error) console.log(error)
    if(!error){
        console.log(result);
    }
});