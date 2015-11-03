# txtree web app

web client for txtree service (with haroo cloud core)

inspirited by [Bootstrap Expo](http://expo.getbootstrap.com/)

## development

prepare browserify, babelify with npm

### build script

> browserify -t babelify  script/*.jsx -o script/build.js

or 

> gulp browserify

### build stylesheet

> gulp stylesheet

### assist in webstorm

use code reference from 

    Preference > language & framework javascript > library > download from typescript community
    
#### careful for web server in webstorm

react router is not match for '/project-name-in-webstorm/index.html' to '/index.html' (root) for this index.html

use simple web server to access directly for root. something like 'http-serve' or 'locally' 
    
## todo

- [x] bind txtree server
- [x] load list from cloud
- [x] bind router
- [x] patch list from cloud by pagination
- [ ] codemirror editor
- [ ] markdown viewer with toggling
- [ ] create document
- [ ] load today list from cloud
- [ ] share to cloud
- [ ] favorite in cloud from local storage
- [ ] document (type and color) theme
- [ ] document (markdown, normal text) type
- [ ] set document live duration
- [ ] search in cloud
