import { attachShadow } from './utils.mjs';

const CUSTOM_ELEMENT_TAG = 'custom-header'

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
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
    align-items: baseline;
}

header > div {
    display: flex;
    flex-direction: column;
}

header nav {
    display: none;
    flex-direction: column;
}

nav div {
    margin: 0.25rem 0;
}

button {
    padding: 0.5rem;
    font-size: 1.25rem;
}

@media (min-width: 700px) {
    button {
      display: none;
    }

    header nav {
      display: flex !important;
    }

    header > div {
      display: flex;
      flex-direction: row;
      gap: 1em;
      align-items: stretch;
    }

    header nav {
      flex-direction: row;
      gap: 1rem;
      align-items: flex-end;
    }
}
    </style>
    <header>
      <div>
        <h1>${isSubpage ? 'Books' : 'Joshua Smith'}</h1>
        <nav>
          <div>
            <a href="index.html">
              ${isSubpage ? 'Home' : '<i>Home</i>'}
            </a>
          </div>
          <div>
            <a href="subpage.html">
              ${isSubpage ? '<i>Books</i>' : 'Books'}
            </a>
          </div>
        </nav>
      </div>
      <button>Menu</button>
    </header>
  `)
}

const TEMPLATE = document.createElement('template')
TEMPLATE.innerHTML = buildHeader(window.location.pathname)

class CustomHeader extends HTMLElement {
  connectedCallback() {
    const shadow = attachShadow(this, TEMPLATE)
    const nav = shadow.querySelector('nav')
    const toggle = shadow.querySelector('button')
    toggle.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex' 
    })

    document.body.addEventListener('click', (e) => {
      if (!document.querySelector(CUSTOM_ELEMENT_TAG).contains(e.target)) {
        nav.style.display = 'none';
      }
    })
  }
}

window.customElements.define(CUSTOM_ELEMENT_TAG, CustomHeader)
