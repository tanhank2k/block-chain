const SHA256 = require("crypto-js/sha256");
const ChainUtil = require("../chain-utils");
class Block {
  constructor(timestamp, lastHash, hash, data, validator, signature) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.validator = validator;
    this.signature = signature;
    this.nonce = 0;
  }

  toString() {
    return `Block - 
          Timestamp : ${this.timestamp}
          Last Hash : ${this.lastHash}
          Hash      : ${this.hash}
          Data      : ${this.data}
          Validator : ${this.validator}
          Signature : ${this.signature}`;
  }

  static genesis() {
    return new this(`genesis time`, "----", "genesis-hash", []);
  }

  static hash(lastHash, timestamp, data, nonce) {
    return SHA256(`${lastHash}${timestamp}${JSON.stringify(data)}${nonce}`).toString();
  }

  static createBlock(lastBlock, data, wallet) {
    let hash;
    let timestamp = Date.now();
    const lastHash = lastBlock.hash;
    hash = Block.hash(lastHash, timestamp, data, 0);

    // get the validators public key
    let validator = wallet.getPublicKey();

    // Sign the block
    let signature = Block.signBlockHash(hash, wallet);
    return new this(timestamp, lastHash, hash, data, validator, signature);
  }

  static signBlockHash(hash, wallet) {
    return wallet.sign(hash);
  }

  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = Block.hash(this.lastHash, this.timestamp, this.data, this.nonce);
    }
  }

  static verifyBlock(block) {
    return ChainUtil.verifySignature(
      block.validator,
      block.signature,
      Block.hash( block.lastHash, block.timestamp, block.data, block.nonce)
    );
  }

  static verifyLeader(block, leader) {
    return block.validator == leader ? true : false;
  }
}

module.exports = Block;
