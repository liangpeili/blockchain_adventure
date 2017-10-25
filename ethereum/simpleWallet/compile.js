//
// compile.js
// simple code to compile a single solidity contract
//
// usage: node compile.js path-to-contract contract-name
//

const solc = require('solc');
const fs = require('fs');

if (process.argv.length <= 3) {
    console.log(`Usage: node ${__filename} path-to-contract contract-name`);
    process.exit(-1);
}

const contractPath = process.argv[2];
const contractName = process.argv[3];
console.log(`Compiling ${contractPath}...`);

var compile = (filename, contractName) => {
    var code = fs.readFileSync(filename).toString();
    var compiledCode = solc.compile(code);
    var abi = compiledCode.contracts[`:${contractName}`].interface;
    var byteCode = compiledCode.contracts[`:${contractName}`].bytecode;
    
    return { abiDefinition: abi, byteCode: byteCode };
}

var {abiDefinition, byteCode} = compile(contractPath, contractName);

fs.writeFileSync(`build/${contractName}-abi.json`, abiDefinition, 'utf-8');
fs.writeFileSync(`build/${contractName}.bin`, byteCode);