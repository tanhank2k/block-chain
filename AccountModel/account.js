class Account {
    constructor() {
        this.addresses = [
          "5aad9b5e21f63955e8840e8b954926c60e0e2d906fdbc0ce1e3afe249a67f614"
        ];
        this.balance = {
          "5aad9b5e21f63955e8840e8b954926c60e0e2d906fdbc0ce1e3afe249a67f614": 1000
        };
        this.history = [];
      }
  
    initialize(address) {
      if (this.balance[address] == undefined) {
        this.balance[address] = 0;
        this.addresses.push(address);
      }
    }
  
    transfer(from, to, amount) {
      this.initialize(from);
      this.initialize(to);
      this.increment(to, amount);
      this.decrement(from, amount);
    }
  
    increment(to, amount) {
      this.balance[to] += amount;
    }
  
    decrement(from, amount) {
      this.balance[from] -= amount;
    }
  
    getBalance(address) {
      this.initialize(address);
      return this.balance[address];
    }
  
    update(transaction) {
      let amount = transaction.output.amount;
      let from = transaction.input.from;
      let to = transaction.output.to;
      this.transfer(from, to, amount);
      this.history.push(transaction);
    }
    transferFee(block, transaction) {
        let amount = transaction.output.fee;
        let from = transaction.input.from;
        let to = block.validator;
        this.transfer(from, to, amount);
      }
    getHistoryTransaction(publicKey){
        this.history.map(transaction => {
          console.log(transaction.input.from);
          console.log(transaction.output.to);
          console.log(publicKey);
        })
        return this.history.filter(transaction => transaction.input.from == publicKey || transaction.output.to == publicKey);
    }
  }
  
  module.exports = Account;