import BlankLink from '../components/BlankLink'

export default function Header() {
  return (
    <header className="logo-container">
      <BlankLink
        href="https://github.com/shuding/react-wrap-balancer"
        className="logo"
      >
        React
        <br />
        Wrap
        <br />
        Balancer
      </BlankLink>
    </header>
  )
}
