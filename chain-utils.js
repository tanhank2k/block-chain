const EDDSA = require("elliptic").eddsa;
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const eddsa = new EDDSA("ed25519");
const uuidV1 = require("uuid").v1;
const SHA256 = require('crypto-js/sha256');

class ChainUtil {
  static genKeyPair(secret) {
    return eddsa.keyFromSecret(secret);
  }
  static id() {
    return uuidV1();
  }
  static verifySignature(publicKey, signature, dataHash) {
    return eddsa.keyFromPublic(publicKey).verify(dataHash, signature);
  }
  static getPrivateKey(publicKey){
      return ec.keyFromPrivate(publicKey).getPrivate();
  }
  static hash(data) {
    return SHA256(JSON.stringify(data)).toString();
  }
}
module.exports = ChainUtil;
