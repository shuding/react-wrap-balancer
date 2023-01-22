import BlankLink from '../components/BlankLink'
import VercelIcon from '../icons/Vercel'

export default function Footer() {
  return (
    <footer
      className='headline'
      style={{
        fontSize: 20,
        marginBottom: 100,
      }}
    >
      <BlankLink
        href='https://vercel.com'
        style={{
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '.4rem',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <span>Deployed on</span>
        <VercelIcon height='1.1em' style={{ marginTop: 2 }} />
      </BlankLink>
    </footer>
  )
}
