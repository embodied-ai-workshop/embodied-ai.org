# Embodied AI Workshop Website

This repository contains the development of [embodied-ai.org](https://embodied-ai.org/).

### Development

#### Quick Fixes

**Organizer Info**. Organizer info is stored in `gatsby-config.js`, where the imageId's correspond to those found in `images/organizers`.

#### Local Development

The website is developed using Gatsby and relies on React, TypeScript, SCSS, and GraphQL, among other things. It's then statically transformed and optimized into HTML, CSS, and JavaScript, which ultimately gets displayed to the user.

To avoid locally developing, feel free to simply create an issue. But, if you're up for it:

1. Install [Node.js](https://www.npmjs.com/get-npm).

2. Install [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable), which makes it easiest to install gatsby dependencies (in my experience, over using NPM directly).

3. Install gatsby-cli with

```
yarn add gatsby-cli
```

4. Clone the repo:

```
git clone <...>
cd <...>
```

5. Install all the package other dependencies (e.g., scss, tsx, etc.) with

```
yarn install
```

6. Invoke gatsby from the root of the directory to build locally:

```
gatsby-develop
```

This should then create a local server which shows the live website at http://localhost:8000/.
