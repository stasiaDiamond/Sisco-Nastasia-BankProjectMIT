# MIT Emeritus Bad Bank 1

Project 2 assignment React SPA Frontend banking app

[Deployed Site](https://stasiadiamond.github.io/Sisco-Nastasia-BankProjectMIT/)

## Features

Users can create a new bank account, login, withdraw, and check balances

## How To

Terminal:

- npx create-react-app `<your-app-name>` `(using instead of Vite for module purposes)`
- cd into directory
- code .

Int Terminal:
npm start
fix files
ctrl + C to stop

BEGIN DEPLOY:

- create New repo on GitHub
- Int T: git init, git remote add origin and push to GitHub  
- Int T: npm install gh-pages --save-dev
- package.json: add  "homepage": `"https://<your-github-username>.github.io/<repository-name>"`
- add all scripts:

  ```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }

- npm run deploy
- GitHub Settings > Pages: change deploy branch to gh-pages and wait

UPDATES:

- npm run build to generate static files
- npm run deploy to publish
- push cycle

## Improvements

The starter code MIT Emeritus gave us is from 2020 and pretty wonky, so I focused on fixing module exports, capitalizing Components, camelCasing, and separation of concerns before beginning. Thankfully I enjoy refactoring and strict attention to detail!

The entire course is a challenge in the art and patience of refactoring.
