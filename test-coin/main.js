const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = [];
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();    
  }

  addNewTransaction(sender, recipient, amount) {
    this.transactions.push({
      sender: sender,
      recipient: recipient,
      amount: amount
    })
  }

  getTransactions() {
    return this.transactions;
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log('Block mined: ' + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2017", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }
    return true;
  }
}

const testCoin = new Blockchain();

console.log('Mining block 1...');
testCoin.addBlock(new Block(1, "10/07/2017"));

console.log('Mining block 2...');
testCoin.addBlock(new Block(2, "12/07/2017"));
