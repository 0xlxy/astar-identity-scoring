import { ETHIcon } from "../../icons";

export default function BalanceChart() {
  return (
    <div>
      <div className="flex justify-between m-3 ml-1.5 mr-5 items-end">
        <p className="font-semibold" style={{ color: "#27292C", fontSize: 22 }}>
          Balances
        </p>
        <div className="flex relative -top-0.5">
          <p style={{ paddingRight: 6, fontSize: 17 }}>Total:</p>
          <p className="font-semibold pr-1">$2,464.33</p>
        </div>
      </div>
      <div
        className="flex items-center bg-white p-4 mr-4"
        style={{ border: "1px solid #E0E5EC", borderRadius: 4 }}
      >
        <ETHIcon />
        <div className="w-full ml-4">
          <div className="flex justify-between">
            <p style={{ fontSize: 18 }}>ETH</p>
            <p className="font-semibold">$2,124.57</p>
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
                $1.00 -
              </p>
              <p
                style={{
                  color: "rgb(249, 91, 114)",
                  fontSize: 14,
                  position: "relative",
                  top: -2,
                }}
              >
                -0.04%
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
              2,124.21
            </p>
          </div>
        </div>
      </div>
      <div
        className="flex items-center bg-white p-4 mr-4"
        style={{ border: "1px solid #E0E5EC", borderRadius: 4 }}
      >
        <ETHIcon />
        <div className="w-full ml-4">
          <div className="flex justify-between">
            <p style={{ fontSize: 18 }}>WETH</p>
            <p className="font-semibold">$2,124.57</p>
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
                $1.00 -
              </p>
              <p
                style={{
                  color: "rgb(249, 91, 114)",
                  fontSize: 14,
                  position: "relative",
                  top: -2,
                }}
              >
                -0.04%
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
              2,124.21
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
