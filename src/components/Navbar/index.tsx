import { useEffect, useContext, Context } from "react";
import { Link } from "react-router-dom";
import { DashboardIcon, LeaderboardIcon } from "../../icons";
import StyledButton from "../Buttons/StyledButton";
import ConnectedWallet from "./ConnectedWallet";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Navbar({
  externalClickEvent,
  walletContext,
}: {
  externalClickEvent: boolean;
  walletContext: Context<
    [
      totalBalance: number,
      setTotalBalance: React.Dispatch<React.SetStateAction<number>>,
      walletAddress: string,
      setAddress: React.Dispatch<React.SetStateAction<string>>,
      walletConnected: boolean,
      setWalletConnected: React.Dispatch<React.SetStateAction<boolean>>
    ]
  >;
}) {
  const [
    _totalBalance,
    _setTotalBalance,
    address,
    setAddress,
    _walletConnected,
    setWalletConnected,
  ] = useContext(walletContext);

  useEffect(() => {
    if (externalClickEvent) connectWallet();
  }, [externalClickEvent]);

  async function isConnected() {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (
      accounts.length &&
      window.localStorage.getItem("walletConnected") === "true"
    ) {
      setAddress(accounts[0].toString());
      setWalletConnected(true);
    }
  }

  useEffect(() => {
    (async () => {
      if (window.ethereum.networkVersion !== 592) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x250" }],
          });
        } catch (err: any) {
          if (err.code === 4902) {
            await addAsterNetwork();
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x250" }],
            });
          }
        }
      }
      isConnected();
    })();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      var res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(res[0]);
      window.localStorage.setItem("walletConnected", "true");
      setWalletConnected(true);
    }
  };
  const disconnectWallet = async () => {
    setAddress("");
    window.localStorage.setItem("walletConnected", "false");
    setWalletConnected(false);
  };

  const addAsterNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x250",
            rpcUrls: ["https://evm.astar.network"],
            chainName: "Astar Network Mainnet",
            nativeCurrency: {
              name: "ASTR",
              symbol: "ASTR",
              decimals: 18,
            },
            blockExplorerUrls: ["https://blockscout.com/astar"],
          },
        ],
      });
    } catch {}
  };

  return (
    <div
      className="flex justify-between items-center px-5 py-4"
      style={{ borderBottom: "solid #E5EBF2 1px" }}
    >
      <div className="flex justify-between items-center" style={{ width: 248 }}>
        <img
          src="/brand-logo-mark.png"
          alt="aster"
          draggable={false}
          style={{ height: 36, width: 36 }}
        />
        <p className="text-xl font-semibold" style={{ color: "#221D3C" }}>
          Aster Identity Scoring
        </p>
      </div>
      <div className="flex">
        <Link
          to="/"
          className="flex items-center justify-between mr-8"
          style={{ width: 106, cursor: "pointer" }}
        >
          <DashboardIcon
            color={
              window.location.pathname.replaceAll("/", "") === ""
                ? "black"
                : "#706f71"
            }
          />
          <p
            className="font-semibold"
            style={{
              color:
                window.location.pathname.replaceAll("/", "") === ""
                  ? "rgba(0, 0, 0, 0.82)"
                  : "#706f71",
            }}
          >
            Dashboard
          </p>
        </Link>
        <Link
          to="/leaderboard"
          className="flex items-center justify-between mr-12"
          style={{ width: 120, cursor: "pointer" }}
        >
          <LeaderboardIcon
            color={
              window.location.pathname
                .replaceAll("/", "")
                .endsWith("leaderboard")
                ? "black"
                : "#706f71"
            }
          />
          <p
            className="font-semibold"
            style={{
              color: window.location.pathname
                .replaceAll("/", "")
                .endsWith("leaderboard")
                ? "rgba(0, 0, 0, 0.82)"
                : "#706f71",
            }}
          >
            Leaderboard
          </p>
        </Link>
        {address ? (
          <div onClick={disconnectWallet}>
            <ConnectedWallet
              address={(
                address.substring(0, 6) +
                "..." +
                address.substr(-6)
              ).toUpperCase()}
            />
          </div>
        ) : (
          <div onClick={connectWallet}>
            <StyledButton text="Connect Wallet" />
          </div>
        )}
      </div>
    </div>
  );
}
