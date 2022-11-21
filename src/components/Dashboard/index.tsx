import { AvatarIcon, ProgressBar, ShareIcon } from "../../icons";
import BalanceChart from "./BalanceChart";
import ScoreMeter from "./ScoreMeter";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div style={{ flex: 0.65 }}>
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
                  0x1D05...B250F0
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="mr-14">
                <p style={{ color: "#27292C", textAlign: "end" }}>Balance</p>
                <p style={{ fontWeight: 600, color: "#221D3C", fontSize: 17 }}>
                  $2,464.33
                </p>
              </div>
              <div>
                <p style={{ color: "#27292C", textAlign: "end" }}>Your Rank</p>
                <div className="flex">
                  <p
                    style={{ fontWeight: 600, color: "#221D3C", fontSize: 17 }}
                  >
                    88
                  </p>
                  <p style={{ color: "#647693", fontSize: 17, marginLeft: 5 }}>
                    of 40758
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "min-content",
                minWidth: "50%",
                backgroundColor: "rgba(249, 250, 252, 0.4)",
                boxShadow: "rgb(228 229 243 / 50%) 0px 4px 20px 6px",
                border: "1px solid #fff",
                padding: 16,
                flex: 0.5,
                paddingTop: 8,
                paddingBottom: 8,
                margin: 20,
                marginTop: 0,
                borderRadius: 4,
              }}
            >
              <div className="w-full">
                <div className="flex items-center justify-between w-full">
                  <p style={{ fontSize: 20, fontWeight: 600 }}>MACRO Score</p>
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
                  <ScoreMeter />
                  <div style={{ margin: "6px 0 0 26px" }}>
                    <div className="flex items-center space-x-2 mb-0.5">
                      <ProgressBar />
                      <p style={{ fontSize: 15, color: "#27292C" }}>
                        DeFi Actions
                      </p>
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
          </div>
        </div>
        <div style={{ flex: 0.35 }}>
          <BalanceChart />
        </div>
      </div>
      <Footer />
    </>
  );
}
