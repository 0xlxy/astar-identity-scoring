import express from "express";
import dotenv from "dotenv";
import { addressValidator } from "./src/lib/validator";
import { getBalances, getWalletInfo } from "./src/lib/request";
import {
  getOGRanking,
  getRankings,
  getUser,
  updateRanking,
} from "./src/lib/db";
import { MongoClient } from "mongodb";

dotenv.config();
const client = new MongoClient(
  process.env.MONGO_URI || "mongodb://0.0.0.0:27017"
);
client.connect();
const app: express.Application = express();
const port: number = Number(process.env.PORT) || 8000;

app.get("/api", (_req, _res) => {
  _res.send({ status: "ok" });
});

app.get("/api/balances/:walletAddress", async (_req, _res) => {
  var checkValidity = addressValidator(_req);
  if (!checkValidity.isValid) return _res.send(checkValidity.err);

  var walletAddress: string = _req.params.walletAddress;
  var res = await getBalances(walletAddress);
  return _res.send(res);
});

app.get("/api/walletInfo/:walletAddress", async (_req, _res) => {
  var checkValidity = addressValidator(_req);
  if (!checkValidity.isValid) return _res.send(checkValidity.err);

  var walletAddress: string = _req.params.walletAddress;
  var user = await getUser(client, walletAddress);
  if (user?.timestamp + 600000 > new Date().valueOf())
    return _res.send({ success: true, data: user });
  var res = await getBalances(walletAddress);
  if (!res.success) return res;
  var contractAddresses = [];
  for (var d of res.data) contractAddresses.push(d.contractAddress);
  var response = await getWalletInfo(walletAddress, contractAddresses);
  if (response.success) updateRanking(client, response.data);
  return _res.send(response);
});

app.get("/api/ogRanking/:walletAddress", async (_req, _res) => {
  var checkValidity = addressValidator(_req);
  if (!checkValidity.isValid) return _res.send(checkValidity.err);

  var walletAddress: string = _req.params.walletAddress;
  var res = await getOGRanking(client, walletAddress);
  return _res.send(res);
});

app.get("/api/rankings/:walletAddress", async (_req, _res) => {
  var checkValidity = addressValidator(_req);
  if (!checkValidity.isValid) return _res.send(checkValidity.err);

  var walletAddress: string = _req.params.walletAddress;
  var res = await getRankings(client, walletAddress);
  return _res.send(res);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
