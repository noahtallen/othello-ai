## About:
This project is an implementation of the Reversi game with an AI opponent for the AI course at Grove City College. Visit it at [https://gcc-reversi-ai.firebaseapp.com/](https://gcc-reversi-ai.firebaseapp.com/)

## Setup:
- Clone project and run `yarn` (or `npm i`)
- Run `yarn start` (or `npm start`).
- Visit [localhost:1234](http://localhost:1234)

## Tools:
- Using Typescript & React to build the website.
- Using [`styled-components`](https://github.com/styled-components/styled-components) for the styles in app. See `src/index.tsx` for a really basic example of how to use it. It puts all CSS inside a js template string. This means you can use variables from javascript (including props) in order to change styles dynamically.
- For CSS syntax highlighting of styled components, install this VS Code plugin: [`vscode-styled-components`](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components).
- Using [`parcel`](https://github.com/parcel-bundler/parcel) as the bundler/dev server. I like it better than webpack because it's 0 configuration & just works out of the box with everything.
