/**
 * This has been a nice exercise in learning to appreciate all that react does
 * and all that TypeScript does.
 */

import { attachShadow } from './utils.mjs';

const CUSTOM_ELEMENT_TAG = 'custom-header'
const THEME_LOCAL_STORAGE_TAG = 'themeing'
const LIGHT_THEME = 'light'
const DARK_THEME = 'dark'
const LIGHT_THEME_CLASS_NAME = 'light-theme'

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
    gap: var(--default-gap);
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

.flex-rows {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: var(--default-gap);
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
      gap: var(--default-gap);
      align-items: stretch;
    }

    header nav {
      flex-direction: row;
      gap: var(--default-gap);
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
      <div class="flex-rows">
        <button>Menu</button>
        <label>
            <input type="checkbox" autocomplete="off" />
            Light mode
        </label>
      </div>
    </header>
  `)
}

const TEMPLATE = document.createElement('template')
TEMPLATE.innerHTML = buildHeader(window.location.pathname)

class CustomHeader extends HTMLElement {
  connectedCallback() {
    const shadow = attachShadow(this, TEMPLATE)
    const nav = shadow.querySelector('nav')
    const menuToggle = shadow.querySelector('button')
    const themeToggle = shadow.querySelector('input')

    /**
     * I don't love using react-hook-esque naming here, but this name is what
     * I'm most used to, so it's what I'm rolling with. It just returns true if
     * the light-theme box is checked, false otherwise.
     */
    const isLightThemeChecked = () =>
      localStorage.getItem(THEME_LOCAL_STORAGE_TAG) === LIGHT_THEME

    if (isLightThemeChecked()) {
      document.body.classList.add(LIGHT_THEME_CLASS_NAME)
    }

    themeToggle.checked = isLightThemeChecked()

    menuToggle.addEventListener('click', () => {
      (nav.style.display = nav.style.display === 'flex'
        ? 'none'
        : 'flex')
    })

    document.body.addEventListener('click', (e) => {
      if (!document.querySelector(CUSTOM_ELEMENT_TAG).contains(e.target)) {
        nav.style.display = 'none';
      }
    })

    themeToggle.addEventListener('change', (e) => {
      localStorage.setItem(THEME_LOCAL_STORAGE_TAG,
        e.target.checked ? LIGHT_THEME : DARK_THEME)

      if (isLightThemeChecked()) {
        document.body.classList.add(LIGHT_THEME_CLASS_NAME)
      } else {
        document.body.classList.remove(LIGHT_THEME_CLASS_NAME)
      }
    })
  }
}

window.customElements.define(CUSTOM_ELEMENT_TAG, CustomHeader)
