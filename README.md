## To Use
```
# Install dependencies
npm install

# Run the app
npm start
```
## Controls
`p` : pause session  
`d` : cancel session

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
    - possibly track by 0-10 continuum instead
- option to display counter
- show options on `esc`
    - counter display: always, between sessions, never
    - key mapping
    - background color selection
    - start and end messages
- play boxing bell audio clip (or something motivational) briefly at start
- add icon to replace default 'electron' icon