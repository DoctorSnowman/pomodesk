# electron-quick-start

**Clone and run for a quick way to see Electron in action.**

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.

**Use this app along with the [Electron API Demos](https://electronjs.org/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

## Build App Executable
Start terminal in project root directory.
### Install electron-packager
`npm install electron-packager -g`
### Build For Current OS + Architecture
`electron-packager ./ pomodesk`

App may be found in: [pomodesk directory](./pomodesk-darwin-x64)

## Future Feature Plans
- pause/unpause with `spacebar`
- quit current countdown with `esc`
- format countdown to always show time with 3 or 4 digits (00:00)
- play boxing bell audio clip (or something motivational) briefly at start
- add icon to replace default 'electron' icon