import { AvatarIcon } from '../../icons'

export default function ConnectedWallet({ address = '0x1D05...B250F0' }) {
  return (
    <div
      style={{
        display: 'flex',
        width: 'min-content',
        border: '1px solid #E6ECF3',
        background: '#F3F7FB',
        borderRadius: '26px 10px 10px 26px',
        padding: '2px 18px 2px 2px',
      }}
    >
      <AvatarIcon size={34} />
      <div style={{ height: 30 }}>
        <p
          className='whitespace-nowrap ml-2 pl-0.5'
          style={{ color: '#000', fontSize: 14, fontWeight: 600 }}
        >
          {address}
        </p>
        <p
          className='whitespace-nowrap ml-2 pl-0.5'
          style={{
            color: '#647693',
            fontSize: 10,
            position: 'relative',
            top: -2,
            cursor: 'pointer',
          }}
        >
          Disconnect
        </p>
      </div>
    </div>
  )
}
