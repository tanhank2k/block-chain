const express = require("express");
const Blockchain = require("./BlockClass/blockchain");
const bodyParser = require("body-parser");
const P2pServer = require("./P2P-Server/p2p-server");
require("dotenv").config();
const Wallet = require("./Wallet/wallet");
const TransactionPool = require("./Transaction-Pool/transaction-pool");

//get the port from the user or set the default port
const HTTP_PORT = process.env.HTTP_PORT || 3001;

//create a new app
const app = express();
const wallet = new Wallet(Date.now().toString());
const transactionPool = new TransactionPool();
//using the blody parser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// create a new blockchain instance
const blockchain = new Blockchain();
const p2pserver = new P2pServer(blockchain, transactionPool, wallet);
p2pserver.listen();
//EXPOSED APIs

//api to get the blocks
app.get("/blocks", (req, res) => {
  res.json(blockchain.chain);
});

//api to add blocks
// app.post("/mine", (req, res) => {
//   const block = blockchain.addBlock(req.body.data);
//   console.log(`New block added: ${block.toString()}`);

//   res.redirect("/blocks");
// });
app.post("/mine", (req, res) => {
      const block = blockchain.addBlock(req.body.data);
      console.log(`New block added: ${block.toString()}`);
      p2pserver.syncChain();
      res.redirect("/blocks");
    });
app.get("/transactions", (req, res) => {
    console.log(transactionPool.transactions);
  res.json(transactionPool.transactions);
});

app.get("/wallet", (req, res) => {
  res.json(wallet.toString());
});

app.post("/transact", (req, res) => {
  const { to, amount, type } = req.body;
  const transaction = wallet.createTransaction(
    to,
    amount,
    type,
    blockchain,
    transactionPool
  );
  p2pserver.broadcastTransaction(transaction);
  res.redirect("/transactions");
});

// app server configurations
app.listen(HTTP_PORT, () => {
  console.log(`listening on port ${HTTP_PORT}`);
});
