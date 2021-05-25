const childProcess = require('child_process');

// childProcess.exec("node --trace-deprecation build/build.js", (e) => {
//     console.log(e);
// })

childProcess.exec("node --trace-deprecation build/dev-server.js", (e) => {
    console.log(e);
})