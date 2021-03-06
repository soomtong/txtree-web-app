# txtree web app

web client for txtree service (with haroo cloud core)

inspirited by [Bootstrap Expo](http://expo.getbootstrap.com/)

## development

prepare browserify, babelify with npm, and provide simple web server for root routing

### build script

> `browserify -t babelify  script/*.jsx -o script/build.js`

or 

> `gulp browserify`

### build stylesheet

> `gulp stylesheet`

### test in local browser

> `node server.js`

or 

> `nodemon server.js`

and open browser then connect app. refresh browser works everywhere

### assist in webstorm

use code reference from 

    Preference > language & framework javascript > library > download from typescript community
    
#### careful for web server in webstorm

react router is not match for '/project-name-in-webstorm/index.html' to '/index.html' (root) for this index.html

use simple web server to access directly for root, something like 'http-serve' or 'locally' 
    
## todo

- [x] bind txtree server
- [x] load list from cloud
- [x] bind router
- [x] patch list from cloud by pagination
- [x] codemirror editor
- [x] markdown viewer with toggling in global at create menu
- [x] create document and share to cloud
- [x] view each document
- [x] update list entry more
- [x] save last data to local storage at every action in create menu
- [x] load last data from local storage at start of create document
- [x] set document live duration
- [x] load today list from cloud
- [x] curate list from cloud
- [x] list order by types from cloud
- [x] favorite in cloud from local storage
- [x] ~~document (type and color) theme~~
- [x] set feedback for each document
- [x] auto resize editor height
- [x] clean up css name
- [x] describe other pages
- [x] bookmarklet
- [x] search in cloud
- [x] refactoring common entry list
- [x] remove jquery stub
