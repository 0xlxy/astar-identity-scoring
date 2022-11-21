import { AvatarIcon } from '../../icons'

export default function Ranks({
  name = '0x26BC...aDd731',
  rank = 1,
  score = 732,
  userRank = false,
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#F9F9FF',
        border: '1px solid #E6ECFD',
        padding: userRank ? '12px 20px' : '16px 20px',
        borderRadius: 4,
      }}
    >
      <div
        className='flex'
        style={{
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div className='flex mr-4'>
          <p style={{ color: '#647693', fontSize: 18 }}>000</p>
          <p style={{ fontWeight: 600, color: '#221D3C', fontSize: 18 }}>
            {rank}
          </p>
        </div>
        <AvatarIcon size={34} />
        <div>
          <p
            style={{
              fontWeight: 600,
              color: '#221D3C',
              fontSize: 15,
              marginLeft: 22,
            }}
          >
            {name}
          </p>
          {userRank ? (
            <p
              style={{
                color: '#647693',
                fontSize: 13,
                textAlign: 'left',
                marginLeft: 22,
              }}
            >
              Your Rank
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <p style={{ color: '#647693', fontWeight: 200, marginRight: 10 }}>
          MACRO Score:
        </p>
        <p style={{ fontWeight: 600, color: '#221D3C' }}>{score}</p>
      </div>
    </div>
  )
}
