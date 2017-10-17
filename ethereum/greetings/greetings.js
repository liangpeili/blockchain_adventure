const Web3 = require('web3');
const solc = require('solc');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const sourceCode = fs.readFileSync('Greetings.sol').toString();

const compiledCode = solc.compile(sourceCode);

const contractABI = JSON.parse(compiledCode.contracts[':Greetings'].interface)

const byteCode = compiledCode.contracts[':Greetings'].bytecode;

greetingsContract = web3.eth.contract(contractABI)

greetingsDeployed = greetingsContract.new({data: '0x'+byteCode, from: web3.eth.accounts[0], gas: 4700000})

greetingsInstance = greetingsContract.at(greetingsDeployed.address)

// for test
web3.eth.accounts
greetingsDeployed.address
greetingsInstance.getGreetings()
greetingsInstance.setGreetings("Hello chainskills", {from: web3.eth.accounts[0]})