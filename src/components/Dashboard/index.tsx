import { AvatarIcon } from "../../icons";
import BalanceChart from "./BalanceChart";
import CreateNFC from "./CreateNFC";
import ConnectWallet from "./ConnectWallet";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { createContext, useEffect, useState } from "react";
import ScoreWidget from "./ScoreWidget";

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

export default function Dashboard() {
  const [totalBalance, setTotalBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [connectClickEvent, setConnectClickEvent] = useState(false);
  const [scores, setScores] = useState({
    ogScore: 0.1,
    txnScore: 0.1,
    volatilityScore: 0.1,
  });
  const [ogRanking, setOgRanking] = useState({ ranking: 0, totalUsers: 10000 });

  useEffect(() => {
    if (connectClickEvent) {
      setConnectClickEvent(false);
    }
  }, [connectClickEvent]);

  useEffect(() => {
    if (walletAddress) {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      fetch(`/api/walletInfo/${walletAddress}`, options)
        .then((response) => response.json())
        .then((response) => {
          if (response.success) setScores(response.data);
        })
        .catch((err) => console.error(err));
      fetch(`/api/ogRanking/${walletAddress}`, options)
        .then((response) => response.json())
        .then((response) => {
          if (response.success) setOgRanking(response.data);
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
        <div className={walletConnected ? "flex" : "flex pointer-events-none"}>
          <div style={{ flex: 0.75 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "min-content",
                backgroundColor: "rgba(249, 250, 252, 0.4)",
                boxShadow: "rgb(228 229 243 / 50%) 0px 4px 20px 6px",
                border: "1px solid #fff",
                padding: 16,
                margin: 20,
                borderRadius: 4,
              }}
              className={walletConnected ? "" : "blur-sm"}
            >
              <div
                style={{
                  display: "flex",
                  width: "min-content",
                  border: "1px solid #E6ECF3",
                  background: "#F9F9FF",
                  borderRadius: "26px 10px 10px 26px",
                  padding: "2px 18px 2px 2px",
                }}
              >
                <AvatarIcon />
                <div>
                  <p
                    className="whitespace-nowrap ml-6 p-0.5 pb-0"
                    style={{ color: "#27292C", fontSize: 17 }}
                  >
                    Unnamed bundle (not minted)
                  </p>
                  <p
                    className="whitespace-nowrap ml-6 pl-0.5"
                    style={{ color: "#647693", fontSize: 14 }}
                  >
                    {(
                      walletAddress.substring(0, 6) +
                      "..." +
                      walletAddress.substr(-6)
                    ).toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-14">
                  <p style={{ color: "#27292C", textAlign: "end" }}>Balance</p>
                  <p
                    style={{ fontWeight: 600, color: "#221D3C", fontSize: 17 }}
                  >
                    ${Intl.NumberFormat("en-US").format(totalBalance)}
                  </p>
                </div>
                <div>
                  <p style={{ color: "#27292C", textAlign: "end" }}>
                    Your Rank
                  </p>
                  <div className="flex">
                    <p
                      style={{
                        fontWeight: 600,
                        color: "#221D3C",
                        fontSize: 17,
                      }}
                    >
                      {ogRanking.ranking}
                    </p>
                    <p
                      style={{ color: "#647693", fontSize: 17, marginLeft: 5 }}
                    >
                      of {ogRanking.totalUsers}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex" style={{ margin: "0 10px" }}>
              <ScoreWidget
                canvasId="ogScore"
                name={"Wallet OG Score"}
                score={scores.ogScore}
              />
              <ScoreWidget
                canvasId="txnScore"
                name={"Txn. Activity Score"}
                score={scores.txnScore}
              />
            </div>
            <div className="flex" style={{ marginLeft: 10 }}>
              <ScoreWidget
                canvasId="volatilityScore"
                name={"Holding Volatility Score"}
                score={scores.volatilityScore}
              />
              {walletConnected ? (
                <CreateNFC />
              ) : (
                <ConnectWallet setConnectClickEvent={setConnectClickEvent} />
              )}
            </div>
          </div>
          <div
            style={{ flex: 0.35 }}
            className={walletConnected ? "" : "blur-sm"}
          >
            <BalanceChart />
          </div>
        </div>
        <Footer />
      </div>
    </WalletContext.Provider>
  );
}
