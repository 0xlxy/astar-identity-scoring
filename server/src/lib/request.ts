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
  const res: any[] = (await request(
    `https://api.n.xyz/api/v1/address/${address}/balances/fungibles?chainID=ethereum&filterDust=false&apikey=${process.env.NXYZ_API_KEY}`
  )) as any[];
  if (res) return { success: true, data: res };
  else return { success: false, data: [] };
};

export const getWalletInfo = async (
  address: string,
  contractAddresses: string[]
) => {
  try {
    var delta = 0;
    var txnScore = 0;
    var nftScore = 0;
    var promises = [];

    promises.push(
      request(
        `https://api.covalenthq.com/v1/1/address/${address}/transactions_v2/?key=${process.env.COVALENT_API_KEY}&page-size=100000`
      )
    );

    promises.push(
      request(
        `https://api.n.xyz/api/v1/address/${address}/balances/nfts?chainID=ethereum&limit=100&apikey=${process.env.NXYZ_API_KEY}`
      )
    );

    for (var contractAddress of contractAddresses) {
      if (contractAddress === "0x0000000000000000000000000000000000000000")
        continue;

      promises.push(
        request(
          `https://api.covalenthq.com/v1/1/address/${address}/transfers_v2/?contract-address=${contractAddress}&key=${process.env.COVALENT_API_KEY}&page-size=100000`
        )
      );
    }

    var res = await Promise.all(promises);
    var txnReq: any = res[0];
    var nftReq: any = res[1];

    if (txnReq?.data?.items)
      txnScore = Math.round(txnReq.data.items.length * 2.3);

    if (nftReq) {
      for (var d of nftReq) {
        if (d.nft?.collection?.floorPrice?.value)
          nftScore += Number(d.nft.collection.floorPrice.value);
      }
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
    nftScore = Math.round((nftScore / 1e17) * 3.5);

    return {
      success: true,
      data: {
        timestamp: new Date().valueOf(),
        walletAddress: address,
        ogScore: delta > 999 ? 999 : delta,
        txnScore: txnScore > 999 ? 999 : txnScore,
        nftScore: nftScore > 999 ? 999 : nftScore,
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
        nftScore: 0,
      },
    };
  }
};
