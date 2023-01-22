import Navbar from "../Navbar";
import Footer from "../Footer";
import Ranks from "./Ranks";
import { createContext, useEffect, useState } from "react";

type WalletModel = [
  totalBalance: number,
  setTotalBalance: React.Dispatch<React.SetStateAction<number>>,
  walletAddress: string,
  setAddress: React.Dispatch<React.SetStateAction<string>>,
  walletConnected: boolean,
  setWalletConnected: React.Dispatch<React.SetStateAction<boolean>>
];

export const WalletContext = createContext<WalletModel>([
  0,
  () => null,
  "",
  () => null,
  false,
  () => null,
]);

export default function Leaderboard() {
  const [totalBalance, setTotalBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectClickEvent, setConnectClickEvent] = useState(false);
  const [sortBy, setSortBy] = useState("ogScore");
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [userRank, setUserRank] = useState({
    rank: 0,
    name: "OG Score",
    score: 0,
  });
  const [rankings, setRankings] = useState({
    ogScoreRankings: {
      user: { ranking: 0, ogScore: 0, txnScore: 0, volatilityScore: 0 },
      totalUsers: 0,
      topRankings: [],
    },
    txnScoreRankings: {
      user: { ranking: 0, ogScore: 0, txnScore: 0, volatilityScore: 0 },
      totalUsers: 0,
      topRankings: [],
    },
    volatilityScoreRankings: {
      user: { ranking: 0, ogScore: 0, txnScore: 0, volatilityScore: 0 },
      totalUsers: 0,
      topRankings: [],
    },
  });

  const formatScore = (score: number) => {
    if (score < 10) return `00${score}`;
    else if (score < 100) return `0${score}`;
    else return Number(score).toString();
  };

  useEffect(() => {
    setRankings({
      ogScoreRankings: {
        user: { ranking: 0, ogScore: 0, txnScore: 0, volatilityScore: 0 },
        totalUsers: 0,
        topRankings: [],
      },
      txnScoreRankings: {
        user: { ranking: 0, ogScore: 0, txnScore: 0, volatilityScore: 0 },
        totalUsers: 0,
        topRankings: [],
      },
      volatilityScoreRankings: {
        user: { ranking: 0, ogScore: 0, txnScore: 0, volatilityScore: 0 },
        totalUsers: 0,
        topRankings: [],
      },
    });
  }, [walletConnected]);

  useEffect(() => {
    if (connectClickEvent) {
      setConnectClickEvent(false);
    }
  }, [connectClickEvent]);

  useEffect(() => {
    var leaderboard = [];
    if (sortBy === "ogScore") {
      var rank: any;
      for (rank of rankings.ogScoreRankings.topRankings) {
        leaderboard.push({
          name: "OG Score",
          walletAddress: rank.walletAddress,
          score: rank.ogScore,
        });
      }
      setUserRank({
        rank: rankings.ogScoreRankings.user.ranking,
        name: "OG Score",
        score: rankings.ogScoreRankings.user.ogScore,
      });
    } else if (sortBy === "txnScore") {
      var rank: any;
      for (rank of rankings.txnScoreRankings.topRankings) {
        leaderboard.push({
          name: "Txn. Score",
          walletAddress: rank.walletAddress,
          score: rank.txnScore,
        });
      }
      setUserRank({
        rank: rankings.txnScoreRankings.user.ranking,
        name: "Txn. Score",
        score: rankings.txnScoreRankings.user.txnScore,
      });
    } else if (sortBy === "volatilityScore") {
      var rank: any;
      for (rank of rankings.volatilityScoreRankings.topRankings) {
        leaderboard.push({
          name: "Holding Volatility Score",
          walletAddress: rank.walletAddress,
          score: rank.volatilityScore,
        });
      }
      setUserRank({
        rank: rankings.volatilityScoreRankings.user.ranking,
        name: "Holding Volatility Score",
        score: rankings.volatilityScoreRankings.user.volatilityScore,
      });
    }
    setLeaderboard(leaderboard);
  }, [sortBy, rankings]);

  useEffect(() => {
    if (walletAddress) {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      fetch(`/api/rankings/${walletAddress}`, options)
        .then((response) => response.json())
        .then((response) => {
          if (response.success) setRankings(response.data);
        })
        .catch((err) => console.error(err));
    }
  }, [walletAddress]);

  return (
    <WalletContext.Provider
      value={[
        totalBalance,
        setTotalBalance,
        walletAddress,
        setWalletAddress,
        walletConnected,
        setWalletConnected,
      ]}
    >
      <div className="select-none">
        <Navbar
          externalClickEvent={connectClickEvent}
          walletContext={WalletContext}
        />
        <div className="flex">
          <div
            style={{
              alignItems: "center",
              height: "min-content",
              backgroundColor: "rgba(249, 250, 252, 0.4)",
              boxShadow: "rgb(228 229 243 / 50%) 0px 4px 20px 6px",
              minWidth: "20%",
              border: "1px solid #fff",
              padding: 16,
              margin: 20,
              borderRadius: 4,
            }}
          >
            <div className="flex justify-between">
              <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
                Leaderboard
              </p>
            </div>
            <div className="flex justify-between">
              <div>
                <p style={{ color: "#647693", fontSize: 14 }}>Your OG Score</p>
                <div className="flex">
                  <p
                    style={{ fontWeight: 600, color: "#221D3C", fontSize: 22 }}
                  >
                    {formatScore(rankings.ogScoreRankings.user.ogScore)}
                  </p>
                </div>
                <p style={{ color: "#647693", fontSize: 14, marginTop: 8 }}>
                  Your Rank
                </p>
                <div className="flex items-end">
                  <p
                    style={{
                      fontWeight: 600,
                      color: "#221D3C",
                      fontSize: 22,
                      paddingRight: 4,
                    }}
                  >
                    {rankings.ogScoreRankings.user.ranking}
                  </p>
                  <p
                    style={{
                      color: "#647693",
                      fontSize: 14,
                      position: "relative",
                      top: -4,
                    }}
                  >
                    of {rankings.ogScoreRankings.totalUsers}
                  </p>
                </div>
              </div>
              <div>
                <p style={{ color: "#647693", fontSize: 14 }}>
                  Your Txn. Score
                </p>
                <div className="flex justify-end">
                  <p
                    style={{ fontWeight: 600, color: "#221D3C", fontSize: 22 }}
                  >
                    {formatScore(rankings.txnScoreRankings.user.txnScore)}
                  </p>
                </div>
                <p
                  style={{
                    color: "#647693",
                    fontSize: 14,
                    marginTop: 8,
                    textAlign: "right",
                  }}
                >
                  Your Rank
                </p>
                <div className="flex items-end justify-end">
                  <p
                    style={{
                      fontWeight: 600,
                      color: "#221D3C",
                      fontSize: 22,
                      paddingRight: 4,
                    }}
                  >
                    {rankings.txnScoreRankings.user.ranking}
                  </p>
                  <p
                    style={{
                      color: "#647693",
                      fontSize: 14,
                      position: "relative",
                      top: -4,
                    }}
                  >
                    of {rankings.txnScoreRankings.totalUsers}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <p style={{ color: "#647693", fontSize: 14, marginTop: 18 }}>
                  Your Holding Volatility Score
                </p>
                <div className="flex">
                  <p
                    style={{ fontWeight: 600, color: "#221D3C", fontSize: 22 }}
                  >
                    {formatScore(
                      rankings.volatilityScoreRankings.user.volatilityScore
                    )}
                  </p>
                </div>
                <p style={{ color: "#647693", fontSize: 14, marginTop: 8 }}>
                  Your Rank
                </p>
                <div className="flex items-end">
                  <p
                    style={{
                      fontWeight: 600,
                      color: "#221D3C",
                      fontSize: 22,
                      paddingRight: 4,
                    }}
                  >
                    {rankings.volatilityScoreRankings.user.ranking}
                  </p>
                  <p
                    style={{
                      color: "#647693",
                      fontSize: 14,
                      position: "relative",
                      top: -4,
                    }}
                  >
                    of {rankings.volatilityScoreRankings.totalUsers}
                  </p>
                </div>
              </div>
              <div>
                <p style={{ color: "#647693", fontSize: 14, marginTop: 18 }}>
                  NFC Nickname
                </p>
                <div className="flex justify-end">
                  <p
                    style={{ fontWeight: 600, color: "#221D3C", fontSize: 22 }}
                  >
                    -
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div
              style={{
                alignItems: "center",
                maxHeight: "70vh",
                overflow: "auto",
                backgroundColor: "rgba(249, 250, 252, 0.4)",
                boxShadow: "rgb(228 229 243 / 50%) 0px 4px 20px 6px",
                border: "1px solid #fff",
                padding: 16,
                margin: 20,
                marginBottom: 0,
                borderRadius: 4,
              }}
            >
              <div className="flex justify-between">
                <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
                  Top addresses by score
                </p>
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      outline: 0,
                      padding: "0 0.5em",
                      border: "0 !important",
                      color: "#000",
                      cursor: "pointer",
                      background: "#f3f4f7",
                    }}
                  >
                    <option value="ogScore">Sort by OG Score</option>
                    <option value="txnScore">Sort by Txn. Score</option>
                    <option value="volatilityScore">
                      Sort by Holding Volatility Score
                    </option>
                  </select>
                </div>
              </div>
              <div>
                {leaderboard.map((user: any, rank) => {
                  return (
                    <div key={user.walletAddress}>
                      <Ranks
                        name={(
                          user.walletAddress.substring(0, 6) +
                          "..." +
                          user.walletAddress.substr(-6)
                        ).toUpperCase()}
                        rank={rank + 1}
                        score={formatScore(user.score)}
                        lable={user.name}
                      />
                      <div style={{ marginBottom: 10 }} />
                    </div>
                  );
                })}
                <div style={{ marginBottom: 20 }} />
              </div>
            </div>
            <div
              className={walletAddress ? "" : "hidden"}
              style={{
                margin: "0 40px 0 35px",
                position: "relative",
                background:
                  "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),linear-gradient(83.83deg, #694ea4 0%, #1b6dc1 37.5%, #1b6dc1 65.1%, #2ea0c4 100%)",
                border: "solid 2px transparent",
                borderRadius: 4,
                top: -40,
              }}
            >
              <Ranks
                name={(
                  walletAddress.substring(0, 6) +
                  "..." +
                  walletAddress.substr(-6)
                ).toUpperCase()}
                rank={userRank.rank}
                score={formatScore(userRank.score)}
                lable={userRank.name}
                userRank={true}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </WalletContext.Provider>
  );
}
