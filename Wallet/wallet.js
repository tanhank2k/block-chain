const ChainUtil = require("../chain-utils");
const { INITIAL_BALANCE } = require("../config");
const Transaction = require("../TransactionClass/transation");

class Wallet {
  constructor(secret) {
    this.keyPair = ChainUtil.genKeyPair(secret);
    this.publicKey = this.keyPair.getPublic("hex");
    this.privateKey = ChainUtil.getPrivateKey(this.keyPair.getSecret("hex"));
    this.balance = INITIAL_BALANCE;
  }

  toString() {
    return `Wallet - 
          publicKey: ${this.publicKey.toString()}
          balance  : ${this.balance}
          keyPair  : ${this.keyPair}`;
  }
  sign(dataHash) {
    return this.keyPair.sign(dataHash).toHex();
  }
  createTransaction(to, amount, type, blockchain, transactionPool) {
    this.balance = this.getBalance(blockchain);
    if (amount > this.balance) {
      console.log(
        `Amount: ${amount} exceeds the current balance: ${this.balance}`
      );
      return;
    }
    let transaction = Transaction.newTransaction(this, to, amount, type);
    transactionPool.addTransaction(transaction);
    return transaction;
  }

  getBalance(blockchain) {
    return blockchain.getBalance(this.publicKey);
  }

  getPublicKey() {
    return this.publicKey;
  }

}

module.exports = Wallet;
