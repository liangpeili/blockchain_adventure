contractAddress = "0x00.."
web3.eth.filter({
address: contractAddress
from: 1,
to: 'latest'
}).get(function (err, result) {
// callback code here
})