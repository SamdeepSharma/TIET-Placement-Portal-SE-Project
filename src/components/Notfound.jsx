/* eslint-disable react/no-unescaped-entities */
const notfound = () => {
  return (
    <div className=" d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#282c34', color: '#fff' }}>
    <div className="text-center">
        <h1 className="display-1 mb-4" style={{ fontFamily: 'monospace', fontSize: '6rem' }}>🙈</h1>
        <h2 className="display-4 mb-4">Error 404: Page Not Found</h2>
        <p className="lead mb-4">Oops! Looks like you're lost in cyberspace.</p>
        <p className="mb-4">The page you're searching for seems to have vanished into the digital abyss.</p>
        <p>Don't panic! You can always <a href="/" style={{ color: '#ffffff', textDecoration: 'underline' }}>return to safety</a>.</p>
    </div>
</div>
  )
}

export default notfound
