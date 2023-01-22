import { useEffect, useContext, useState } from "react";
import { WalletContext } from "../Dashboard";

function BalanceTab({
  symbol,
  imageURI,
  balance,
  balanceInUSD,
  value,
}: {
  symbol: string;
  imageURI: string;
  balance: number;
  balanceInUSD: number;
  value: number;
}) {
  return (
    <div
      className="flex items-center bg-white p-4 mr-4"
      style={{ border: "1px solid #E0E5EC", borderRadius: 4 }}
    >
      <img
        src={imageURI}
        alt="icon"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
        }}
        style={{ width: 40, height: 40 }}
      />
      <div className="w-full ml-4">
        <div className="flex justify-between">
          <p style={{ fontSize: 18 }}>{symbol}</p>
          <p className="font-semibold">
            $
            {Intl.NumberFormat("en-US").format(Number(balanceInUSD.toFixed(3)))}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <p
              style={{
                color: "#647699",
                marginRight: 4,
                fontSize: 14,
                position: "relative",
                top: -2,
              }}
            >
              ${Intl.NumberFormat("en-US").format(Number(value.toFixed(2)))}
            </p>
          </div>
          <p
            style={{
              color: "#647699",
              fontSize: 14,
              position: "relative",
              top: -2,
            }}
          >
            {Intl.NumberFormat("en-US").format(Number(balance.toFixed(2)))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BalanceChart() {
  const [
    totalBalance,
    setTotalBalance,
    walletAddress,
    _setWalletAddress,
    _setWalletConnected,
  ] = useContext(WalletContext);
  const [walletBalances, setWalletBalances] = useState([]);

  useEffect(() => {
    if (walletAddress) {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      fetch(`/api/balances/${walletAddress}`, options)
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setWalletBalances(response.data);
            var totalBalance = 0;
            for (var d of response.data) {
              if (d["quote"]) totalBalance += d["quote"];
              setTotalBalance(totalBalance);
            }
          }
        })
        .catch((err) => console.error(err));
    }
  }, [walletAddress]);

  return (
    <div>
      <div className="flex justify-between m-3 ml-1.5 mr-5 items-end">
        <p className="font-semibold" style={{ color: "#27292C", fontSize: 22 }}>
          Balances
        </p>
        <div className="flex relative -top-0.5">
          <p style={{ paddingRight: 6, fontSize: 17 }}>Total:</p>
          <p className="font-semibold pr-1">
            ${Intl.NumberFormat("en-US").format(totalBalance)}
          </p>
        </div>
      </div>
      <>
        {walletBalances.map((data) => {
          if (data["type"] === "cryptocurrency") {
            return (
              <BalanceTab
                key={data["contract_ticker_symbol"]}
                symbol={data["contract_ticker_symbol"]}
                imageURI={data["logo_url"]}
                balance={Number(data["balance"]) / 1e18}
                balanceInUSD={data["quote"] || 0}
                value={data["quote_rate"] || 0}
              />
            );
          }
        })}
      </>
    </div>
  );
}
