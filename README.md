## To Use
```
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
- option to mark session "success" or "failure" after session
    - failure count in red, success count in blue/green 
- option to display counter
- pause/unpause with `spacebar`
- quit current countdown with `esc`
- play boxing bell audio clip (or something motivational) briefly at start
- add icon to replace default 'electron' icon