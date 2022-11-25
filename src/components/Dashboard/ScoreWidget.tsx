import { useContext } from "react";
import { WalletContext } from ".";
import { ProgressBar, ShareIcon } from "../../icons";
import ScoreMeter from "./ScoreMeter";

export default function ScoreWidget({
  canvasId,
  name,
  score,
}: {
  canvasId: string;
  name: string;
  score: number;
}) {
  const [
    _totalBalance,
    _setTotalBalance,
    _address,
    _setAddress,
    walletConnected,
    _setWalletConnected,
  ] = useContext(WalletContext);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "min-content",
        backgroundColor: "rgba(249, 250, 252, 0.4)",
        boxShadow: "rgb(228 229 243 / 50%) 0px 4px 20px 6px",
        border: "1px solid #fff",
        padding: 16,
        flex: 0.5,
        paddingTop: 8,
        paddingBottom: 8,
        margin: "0px 10px 20px 10px",
        borderRadius: 4,
      }}
      className={walletConnected ? "" : "blur-sm"}
    >
      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <p style={{ fontSize: 20, fontWeight: 600 }}>{name}</p>
          <div className="flex items-center">
            <p
              style={{
                marginRight: 14,
                fontSize: 15,
                color: "#27292C",
                background:
                  "linear-gradient(90deg, #1b6dc1 4.46%, #8b5bc5 61.01%, #ff5cb3 118.75%)",
                backgroundClip: "border-box",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View score details
            </p>
            <ShareIcon />
          </div>
        </div>
        <div className="flex">
          <ScoreMeter id={canvasId} score={score} />
          <div style={{ margin: "6px 0 0 26px" }}>
            <div className="flex items-center space-x-2 mb-0.5">
              <ProgressBar />
              <p style={{ fontSize: 15, color: "#27292C" }}>DeFi Actions</p>
            </div>
            <div className="flex items-center space-x-2 mb-0.5">
              <ProgressBar />
              <p style={{ fontSize: 15, color: "#27292C" }}>
                Liquidation History
              </p>
            </div>
            <div className="flex items-center space-x-2 mb-0.5">
              <ProgressBar />
              <p style={{ fontSize: 15, color: "#27292C" }}>
                Health and Risk Factors
              </p>
            </div>
            <div className="flex items-center space-x-2 mb-0.5">
              <ProgressBar />
              <p style={{ fontSize: 15, color: "#27292C" }}>
                Length of History
              </p>
            </div>
            <div className="flex items-center space-x-2 mb-0.5">
              <ProgressBar />
              <p
                style={{
                  marginRight: 14,
                  fontSize: 15,
                  color: "#27292C",
                  background:
                    "linear-gradient(90deg, #1b6dc1 4.46%, #8b5bc5 61.01%, #ff5cb3 118.75%)",
                  backgroundClip: "border-box",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                +3 items
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
