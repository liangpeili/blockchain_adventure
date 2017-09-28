const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = [];
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions)).toString();    
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
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2017", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
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
const block1 = new Block(1, '10/07/2017');
const block2 = new Block(2, '12/07/2017');
block1.addNewTransaction('Alice', 'Bob', 100);
block1.addNewTransaction('Leo', 'Carol', 300);
block2.addNewTransaction('Jack', 'David', 1000)
testCoin.addBlock(new Block(1, "10/07/2017"));
testCoin.addBlock(new Block(2, "12/07/2017"));

console.log(block1.getTransactions());
console.log('Is blockchain valid? ' + testCoin.isChainValid());
