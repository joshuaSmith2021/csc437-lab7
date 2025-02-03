import { attachShadow } from './utils.mjs';

const buildHeader = (pathname) => {
  const isSubpage = pathname === '/subpage.html'

  return (`
    <style>
* {
    margin: 0;
    padding: 0;
}

a {
    color: var(--color-link);
}

header {
    padding: 1rem;
    background-color: var(--color-header);
    display: flex;
    align-items: baseline;
    gap: 1rem;
}

header a {
    margin: 0 1rem;
}
    </style>
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

const TEMPLATE = document.createElement('template')
TEMPLATE.innerHTML = buildHeader(window.location.pathname)
console.log(TEMPLATE.innerHTML)

class CustomHeader extends HTMLElement {
  connectedCallback() {
    attachShadow(this, TEMPLATE)
  }
}

customElements.define('custom-header', CustomHeader)
