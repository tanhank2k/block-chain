const Block = require("./block");
const Wallet = require("../Wallet/wallet");
const Stake = require("../StakeModel/stake");
const Account = require("../AccountModel/account");
const Validators = require("../ValidatorClass/validator");
let secret = "i am the first leader";

const TRANSACTION_TYPE = {
    transaction: "TRANSACTION",
    stake: "STAKE",
    validator_fee: "VALIDATOR_FEE"
  };

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
    this.stakes = new Stake();
    this.accounts = new Account();
    this.validators = new Validators();
    this.difficulty = 0;
  }
  createBlock(transactions, wallet) {
    const block = Block.createBlock(
      this.chain[this.chain.length - 1],
      transactions,
      wallet
    );
    return block;
  }

  addBlock(data) {
    const block = Block.createBlock(
      this.chain[this.chain.length - 1],
      data,
      new Wallet(secret)
    );
    block.proofOfWork(this.difficulty);
    this.chain.push(block);
    return block;
  }

  getLeader() {
    return this.stakes.getMax(this.validators.list);
  }

  static blockHash(block) {
    //destructuring
    const { timestamp, lastHash, data, nonce } = block;
    return Block.hash(lastHash, timestamp, data, nonce);
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];
      const hash = Blockchain.blockHash(block);
      if (block.lastHash !== lastBlock.hash || block.hash !== hash)
        return false;
    }

    return true;
  }

  getBalance(publicKey) {
    return this.accounts.getBalance(publicKey);
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log("Recieved chain is not longer than the current chain");
      return;
    } else if (!this.isValidChain(newChain)) {
      console.log("Recieved chain is invalid");
      return;
    }

    console.log("Replacing the current chain with new chain");
    this.chain = newChain;
  }

  isValidBlock(block) {
    const lastBlock = this.chain[this.chain.length - 1];
    /**
     * check hash
     * check last hash
     * check signature
     * check leader
     */
    if (
      block.lastHash === lastBlock.hash &&
      block.hash === Block.hash(block.lastHash, block.timestamp, block.data, block.nonce) &&
      Block.verifyBlock(block) &&
      Block.verifyLeader(block, this.getLeader())
    ) {
      console.log("block valid");
      this.addBlock(block);
      return true;
    } else {
      return false;
    }
  }

  executeTransactions(block) {
    block.data.forEach((transaction) => {
      switch (transaction.type) {
        case TRANSACTION_TYPE.transaction:
          this.accounts.update(transaction);
          this.accounts.transferFee(block, transaction);
          break;
        case TRANSACTION_TYPE.stake:
          this.stakes.update(transaction);
          this.accounts.decrement(
            transaction.input.from,
            transaction.output.amount
          );
          this.accounts.transferFee(block, transaction);

          break;
        case TRANSACTION_TYPE.validator_fee:
          console.log("VALIDATOR_FEE");
          if (this.validators.update(transaction)) {
            this.accounts.decrement(
              transaction.input.from,
              transaction.output.amount
            );
            this.accounts.transferFee(block, transaction);
          }
          break;
      }
    });
  }

  executeChain(chain) {
    chain.forEach((block) => {
      this.executeTransactions(block);
    });
  }

  resetState() {
    this.chain = [Block.genesis()];
    this.stakes = new Stake();
    this.accounts = new Account();
    this.validators = new Validators();
  }
}

module.exports = Blockchain;
