const Transaction = require("../TransactionClass/transation");
const {TRANSACTION_THRESHOLD} = require("../config");
class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
    if (this.transactions.length >= TRANSACTION_THRESHOLD) {
      return true;
    } else {
      return false;
    }
  }

  validTransactions() {
    return this.transactions.filter((transaction) => {
      if (!Transaction.verifyTransaction(transaction)) {
        console.log(`Invalid signature from ${transaction.data.from}`);
        return;
      }

      return transaction;
    });
  }
  
  thresholdReached() {
    if (this.transactions.length >= TRANSACTION_THRESHOLD) {
      return true;
    } else {
      return false;
    }
  }

  transactionExists(transaction) {
    let exists = this.transactions.find((t) => t.id === transaction.id);
    return exists;
  }
  clear() {
    this.transactions = [];
  }
}

module.exports = TransactionPool;
