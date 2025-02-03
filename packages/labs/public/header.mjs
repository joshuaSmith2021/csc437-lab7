import { toHtmlElement } from "./toHtmlElement.mjs"

const buildHeader = (pathname) => {
  const isSubpage = pathname === '/subpage.html'

  return toHtmlElement(`
    <header>
      <h1>${isSubpage ? 'Books' : 'Joshua Smith'}</h1>
      <nav>
        <a href="index.html">
          ${isSubpage ? 'Home' : '<i>Home</i>'}
        </a>
        <a href="subpage.html">
          ${isSubpage ? '<i>Books</i>' : 'Books'}
        </a>
      </nav>
    </header>
  `)
}

const prependHeader = (pathname) =>
  document.querySelector('body').prepend(buildHeader(pathname))

window.addEventListener('load', (e) => {
  const pathname = e.target.location.pathname
  prependHeader(pathname)
})
