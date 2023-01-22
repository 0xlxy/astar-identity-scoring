import https from "https";

const request = async (url: string) => {
  return new Promise((resolve) => {
    try {
      https.get(url, (res) => {
        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          var parsedData;
          try {
            parsedData = JSON.parse(rawData);
          } catch {}
          resolve(parsedData);
        });
      });
    } catch {
      return {};
    }
  });
};

export const getBalances = async (address: string) => {
  const res: any = (await request(
    `https://api.covalenthq.com/v1/592/address/${address}/balances_v2/?key=${process.env.COVALENT_API_KEY}&page-size=100000`
  )) as any;
  if (res) return { success: true, data: res.data.items as any[] };
  else return { success: false, data: [] };
};

export const getWalletInfo = async (
  address: string,
  contractAddresses: string[]
) => {
  try {
    var delta = 0;
    var txnScore = 0;
    var volatilityScore = 0;
    var promises = [];

    promises.push(
      request(
        `https://api.covalenthq.com/v1/592/address/${address}/transactions_v2/?key=${process.env.COVALENT_API_KEY}&page-size=10000`
      )
    );

    promises.push(
      request(
        `https://api.covalenthq.com/v1/592/address/${address}/portfolio_v2/?key=${process.env.COVALENT_API_KEY}`
      )
    );

    for (var contractAddress of contractAddresses) {
      if (contractAddress === "0x0000000000000000000000000000000000000000")
        continue;

      promises.push(
        request(
          `https://api.covalenthq.com/v1/592/address/${address}/transfers_v2/?contract-address=${contractAddress}&key=${process.env.COVALENT_API_KEY}&page-size=10000`
        )
      );
    }

    var res = await Promise.all(promises);
    var txnReq: any = res[0];
    var volatilityReq: any = res[1];

    if (txnReq?.data?.items) txnScore = Math.round(txnReq.data.items.length);

    if (volatilityReq.data.item) {
      const holdings = volatilityReq.data.items[0].holdings;
      let high = 0;
      let low = 0;
      for (var holding of holdings) {
        high += Number(holding.high.quote);
        low += Number(holding.low.quote);
      }
      volatilityScore = high - low;
    }

    for (var i = 2; i < res.length; i++) {
      var resI: any = res[i];
      if (resI?.data?.items) {
        for (var item of resI.data.items) {
          for (var transfer of item.transfers) {
            delta += Number(transfer.delta);
          }
        }
      }
    }

    delta = Math.round((delta / 1e22) * 2.2);
    volatilityScore = Math.round(volatilityScore / 10);

    return {
      success: true,
      data: {
        timestamp: new Date().valueOf(),
        walletAddress: address,
        ogScore: delta > 999 ? 999 : delta,
        txnScore: txnScore > 999 ? 999 : txnScore,
        volatilityScore: volatilityScore > 999 ? 999 : volatilityScore,
      },
    };
  } catch {
    return {
      success: false,
      data: {
        timestamp: new Date().valueOf(),
        walletAddress: address,
        ogScore: 0,
        txnScore: 0,
        volatilityScore: 0,
      },
    };
  }
};
