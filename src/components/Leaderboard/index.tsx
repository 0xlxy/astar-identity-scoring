import Navbar from "../Navbar";
import Footer from "../Footer";
import Ranks from "./Ranks";

export default function Leaderboard() {
  return (
    <>
      <Navbar />
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
          <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
            Leaderboard
          </p>
          <p style={{ color: "#647693", fontSize: 14 }}>Your MACRO Score</p>
          <div className="flex">
            <p style={{ fontWeight: 600, color: "#221D3C", fontSize: 22 }}>
              658
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
              39
            </p>
            <p
              style={{
                color: "#647693",
                fontSize: 14,
                position: "relative",
                top: -4,
              }}
            >
              of 40758
            </p>
          </div>
          <p style={{ color: "#647693", fontSize: 14, marginTop: 8 }}>
            NFC Nickname
          </p>
          <div className="flex">
            <p style={{ fontWeight: 600, color: "#221D3C", fontSize: 22 }}>-</p>
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
            <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
              Top addresses by score
            </p>
            <div>
              <Ranks name={"0x26BC...aDd731"} rank={1} score={732} />
              <div style={{ marginBottom: 10 }} />
              <Ranks name={"0x56789.eth"} rank={2} score={732} />
              <div style={{ marginBottom: 10 }} />
              <Ranks name={"bfun.eth"} rank={3} score={721} />
              <div style={{ marginBottom: 10 }} />
              <Ranks name={"0x208B...4C4c51"} rank={4} score={704} />
              <div style={{ marginBottom: 10 }} />
              <Ranks name={"0xDb1b...3cc191"} rank={5} score={701} />
              <div style={{ marginBottom: 10 }} />
              <Ranks name={"0x5680...c28975"} rank={6} score={693} />
              <div style={{ marginBottom: 10 }} />
              <Ranks name={"0xDb1b...3cc191"} rank={7} score={693} />
              <div style={{ marginBottom: 10 }} />
              <Ranks name={"0x5680...c28975"} rank={8} score={691} />
              <div style={{ marginBottom: 10 }} />
              <Ranks name={"jojoli08.eth"} rank={9} score={691} />
              <div style={{ marginBottom: 30 }} />
            </div>
          </div>
          <div
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
              name={"0x26BC...aDd731"}
              rank={8}
              score={658}
              userRank={true}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
