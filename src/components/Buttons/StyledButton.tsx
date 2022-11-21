export default function ConnectWalletButton({ text = "Connect Wallet" }) {
  return (
    <>
      <div
        className="hover:brightness-125"
        style={{
          background:
            "linear-gradient(83.83deg, #694ea4 0%, #1b6dc1 37.5%, #1b6dc1 65.1%, #2ea0c4 100%)",
          width: "min-content",
          whiteSpace: "nowrap",
          boxShadow: "0px 2px 2px rgba(0,0,0,.3)",
          transition: "all .15s ease-in-out",
          padding: ".39rem .9rem",
          color: "white",
          borderRadius: ".1rem",
          cursor: "pointer",
        }}
      >
        {text}
      </div>
    </>
  );
}
