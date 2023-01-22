import { MongoClient } from "mongodb";

function getRankAndScoreFromIndex(data: any[], walletAddress: string) {
  for (var i = 0; i < data.length; i++) {
    if (
      String(data[i].walletAddress).toLowerCase() ===
      walletAddress.toLowerCase()
    ) {
      return {
        ranking: i + 1,
        ogScore: data[i].ogScore,
        txnScore: data[i].txnScore,
        volatilityScore: data[i].volatilityScore,
      };
    }
  }
  return { ranking: -1, score: 0 };
}

export async function getOGRanking(client: MongoClient, walletAddress: string) {
  try {
    const ogScoreCursor = client
      .db("RANKINGS")
      .collection("RANKINGS")
      .find()
      .sort({ ogScore: -1 });
    const ogScoreRes = await ogScoreCursor.toArray();
    var rank = getRankAndScoreFromIndex(ogScoreRes, walletAddress).ranking;

    return {
      success: true,
      data: {
        ranking: rank === -1 ? ogScoreRes.length + 1 : rank,
        totalUsers: rank === -1 ? ogScoreRes.length + 1 : ogScoreRes.length,
      },
    };
  } catch {
    return { success: false, data: {} };
  }
}

export async function getRankings(client: MongoClient, walletAddress: string) {
  try {
    const ogScoreCursor = client
      .db("RANKINGS")
      .collection("RANKINGS")
      .find()
      .sort({ ogScore: -1 });
    const ogScoreRes = await ogScoreCursor.toArray();

    const txnScoreCursor = client
      .db("RANKINGS")
      .collection("RANKINGS")
      .find()
      .sort({ txnScore: -1 });
    const txnScoreRes = await txnScoreCursor.toArray();

    const volatilityScoreCursor = client
      .db("RANKINGS")
      .collection("RANKINGS")
      .find()
      .sort({ volatilityScore: -1 });
    const volatilityScoreRes = await volatilityScoreCursor.toArray();

    return {
      success: true,
      data: {
        ogScoreRankings: {
          user: getRankAndScoreFromIndex(ogScoreRes, walletAddress),
          totalUsers: ogScoreRes.length,
          topRankings: ogScoreRes.slice(0, 99),
        },
        txnScoreRankings: {
          user: getRankAndScoreFromIndex(txnScoreRes, walletAddress),
          totalUsers: txnScoreRes.length,
          topRankings: txnScoreRes.slice(0, 99),
        },
        volatilityScoreRankings: {
          user: getRankAndScoreFromIndex(volatilityScoreRes, walletAddress),
          totalUsers: volatilityScoreRes.length,
          topRankings: volatilityScoreRes.slice(0, 99),
        },
      },
    };
  } catch {
    return {};
  }
}

export async function getUser(client: MongoClient, walletAddress: string) {
  try {
    const result = await client
      .db("RANKINGS")
      .collection("RANKINGS")
      .findOne({ walletAddress });
    return result;
  } catch {
    return { timestamp: 0 };
  }
}

export async function updateRanking(
  client: MongoClient,
  data: {
    timestamp: number;
    walletAddress: string;
    ogScore: number;
    txnScore: number;
    volatilityScore: number;
  }
) {
  try {
    const res = await getUser(client, data.walletAddress);
    if (res) {
      await client
        .db("RANKINGS")
        .collection("RANKINGS")
        .updateOne({ walletAddress: data.walletAddress }, { $set: data });
    } else await client.db("RANKINGS").collection("RANKINGS").insertOne(data);
  } catch {
    return {};
  }
}

