# Monitor

Volons Monitor is a 'getting started' trivial web application using Volons NPM to monitor real-time flight. 
This web application is build with [preact](https://preactjs.com/).

1 - `$ volons start`: Starts volons' docker container on your localhost
2 - `$ npm run dev`: Starts Preact server (More: CLI Commands below)
3 - Open http://localhost:8080/
4 - `$ node YourMission.js`: Execute mission using Volons NPM.

## CLI Commands

``` bash
# Clone volons/monitor repository
git clone git@github.com:volons/monitor.git

# install dependencies
cd monitor/
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and preact-render-spy 
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
