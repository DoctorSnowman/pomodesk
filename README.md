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
`⌘+r` : restart app (clears session count)

## Build App Executable
Start terminal in project root directory.
### Install electron-packager
`npm install electron-packager -g`
### Build For Current OS + Architecture
`electron-packager ./ pomodesk`

Built App will be in the [pomodesk directory](./pomodesk-darwin-x64)

## Future Feature Plans
- reset session count on new day (default to CST)
- track week and lifetime sessions
- merge new config defaults with existing preference file for backwards compatibility
- show options on `esc`
    - counter display: always, between sessions, never
    - key mapping
    - background color selection
    - start and end messages
    - button label text
    - end song
    - volume
    - track session count?
    - session count auto-reset at 0200?
    - config storage location
- extract config to new object and control get/set there
    - atm can manually bypass setters directly through store
- streamline store
    - using strings for map keys is bad == gross
    - calling syntax is ugly, keep copy of config model for values and auto-save on update
- add start audio (maybe default is boxing bell?)
- add pause counter and display
  - don't show if zero
  - add to options
- add option to change time zone
- keep track of session per week with button to show on main screen
    - maybe show next day
- add icon to replace default 'electron' icon
- option to mark session "success" or "failure" after session
    - failure count in red, success count in blue/green
    - possibly track by 0-10 continuum instead?