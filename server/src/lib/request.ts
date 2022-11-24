import axios from "axios";

export const getBalances = async (address: string) => {
  try {
    var res = await axios.get(
      `https://api.n.xyz/api/v1/address/${address}/balances/fungibles?chainID=ethereum&filterDust=false&apikey=${process.env.NXYZ_API_KEY}`,
      {
        timeout: 8000,
      }
    );
    return { success: true, data: res.data };
  } catch {
    return { success: false, data: {} };
  }
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
      axios
        .get(
          `https://api.covalenthq.com/v1/1/address/${address}/transactions_v2/?key=${process.env.COVALENT_API_KEY}&page-size=100000`,
          {
            timeout: 8000,
          }
        )
        .catch((_err) => {
          return { data: {} };
        })
    );

    promises.push(
      axios
        .get(
          `https://api.n.xyz/api/v1/address/${address}/balances/nfts?chainID=ethereum&limit=100&apikey=${process.env.NXYZ_API_KEY}`,
          {
            timeout: 8000,
          }
        )
        .catch((_err) => {
          return { data: {} };
        })
    );

    for (var contractAddress of contractAddresses) {
      promises.push(
        axios
          .get(
            `https://api.covalenthq.com/v1/1/address/${address}/transfers_v2/?contract-address=${contractAddress}&key=${process.env.COVALENT_API_KEY}&page-size=100000`,
            {
              timeout: 8000,
            }
          )
          .catch((_err) => {
            return { data: {} };
          })
      );
    }

    var res = await Promise.all(promises);

    if (res[0]?.data?.data?.items)
      txnScore = Math.round(res[0].data.data.items.length * 2.3);

    if (res[1]?.data) {
      for (var d of res[1].data) {
        if (d.nft?.collection?.floorPrice?.value)
          nftScore += Number(d.nft.collection.floorPrice.value);
      }
    }

    for (var i = 2; i < res.length; i++) {
      if (res[i]?.data?.data?.items) {
        for (var item of res[i].data.data.items) {
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
