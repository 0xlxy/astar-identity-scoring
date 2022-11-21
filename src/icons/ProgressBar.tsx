export default function ProgressBar() {
  return (
    <svg
      viewBox='0 0 100 100'
      data-test-id='CircularProgressbar'
      style={{ height: 16 }}
    >
      <circle cx='50' cy='50' r='50' style={{ fill: 'transparent' }}></circle>
      <path
        d='
      M 50,50
      m 0,-42
      a 42,42 0 1 1 0,84
      a 42,42 0 1 1 0,-84
    '
        strokeWidth='16'
        fillOpacity='0'
        style={{
          stroke: 'rgb(229, 235, 243)',
          strokeDasharray: '263.894px, 263.894px',
          strokeDashoffset: 0,
        }}
      ></path>
      <path
        d='
      M 50,50
      m 0,-42
      a 42,42 0 1 1 0,84
      a 42,42 0 1 1 0,-84
    '
        strokeWidth='16'
        fillOpacity='0'
        style={{
          stroke: '#647699',
          strokeDasharray: '263.894px, 263.894px',
          strokeDashoffset: '108.662px',
        }}
      ></path>
    </svg>
  )
}
