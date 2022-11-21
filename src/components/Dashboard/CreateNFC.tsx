import StyledButtton from "../Buttons/StyledButton";

export default function CreateNFC() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "min-content",
        backgroundColor: "rgba(249, 250, 252, 0.4)",
        boxShadow: "rgb(228 229 243 / 50%) 0px 4px 20px 6px",
        border: "1px solid #fff",
        padding: "22px 16px",
        margin: "0 20px 20px 0",
        borderRadius: 4,
        textAlign: "center",
      }}
    >
      <div>
        <p
          style={{
            fontSize: 15,
            color: "#27292C",
            width: 220,
          }}
        >
          Verify ownership of your wallet to create an NFC and view your MACRO
          Score.
        </p>
        <div
          style={{
            margin: "0 auto",
            width: "min-content",
            marginTop: 20,
            marginBottom: 12,
          }}
        >
          <StyledButtton text="Create NFC" />
        </div>
      </div>
    </div>
  );
}
