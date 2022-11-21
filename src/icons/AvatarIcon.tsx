export default function DashboardIcon({ color = 'black', size = 52 }) {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill={color}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
    >
      <rect width='32' height='32' rx='16' fill='#DCE6F1'></rect>
      <path
        d='M5.97363 28.4701C7.00873 25.2484 10.0758 22.9057 13.6887 22.9057H18.3109C21.9229 22.9057 24.9906 25.2484 26.0259 28.4702C23.2844 30.6772 19.8 31.9988 16.0069 32.0004C16.0045 32.0004 16.0022 32.0004 15.9998 32.0004C15.9975 32.0004 15.9951 32.0004 15.9928 32.0004C12.1996 31.9988 8.71514 30.6772 5.97363 28.4701Z'
        fill='#8C9EB9'
      ></path>
      <path
        d='M15.9998 20.632C13.1329 20.632 10.7998 18.3367 10.7998 15.5162C10.7998 12.6957 13.1329 10.4004 15.9998 10.4004C18.8667 10.4004 21.1998 12.6957 21.1998 15.5162C21.1998 18.3367 18.8667 20.632 15.9998 20.632Z'
        fill='#8C9EB9'
      ></path>
      <circle
        cx='28'
        cy='28'
        r='4'
        fill='#59CC72'
        stroke='#F9F9FF'
        strokeWidth='2'
      ></circle>
    </svg>
  )
}
