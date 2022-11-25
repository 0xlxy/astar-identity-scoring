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
  balance: string;
  balanceInUSD: string;
  value: number;
}) {
  return (
    <div
      className="flex items-center bg-white p-4 mr-4"
      style={{ border: "1px solid #E0E5EC", borderRadius: 4 }}
    >
      <img src={imageURI} alt="icon" style={{ width: 40, height: 40 }} />
      <div className="w-full ml-4">
        <div className="flex justify-between">
          <p style={{ fontSize: 18 }}>{symbol}</p>
          <p className="font-semibold">${balanceInUSD}</p>
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
            {balance}
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
              if (d["fiat"] && d["fiat"][0])
                totalBalance += d["fiat"][0]["tokenValue"];
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
          if (data["fiat"] && data["fiat"][0]) {
            return (
              <BalanceTab
                key={data["symbol"]}
                symbol={data["symbol"]}
                imageURI={
                  ((data["symbolLogos"] || [])[0] || {})["URI"] ||
                  "https://c.neevacdn.net/image/upload/tokenLogos/ethereum/ethereum.png"
                }
                balance={data["pretty"]}
                balanceInUSD={data["fiat"][0]["pretty"]}
                value={data["fiat"][0]["tokenValue"] / data["tokenValue"]}
              />
            );
          }
        })}
      </>
    </div>
  );
}
