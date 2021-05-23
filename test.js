const childProcess = require('child_process');

childProcess.exec("node --trace-deprecation src/front/build/build.js", (e) => {
    console.log(e);
})