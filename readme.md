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
    
## todo

- [ ] bind txtree server
- [ ] load list from cloud
- [ ] patch list from cloud by pagination
- [ ] load today list from cloud
- [ ] share to cloud
- [ ] favorite in cloud from local storage
- [ ] document (type and color) theme
- [ ] document (markdown, normal text) type
- [ ] search in cloud
