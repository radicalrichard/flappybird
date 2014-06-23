// git log

var exec = require('child_process').exec

exec('git log', function(err, stdout, stderr) {
  var log = stdout;
  console.log(log.split('\n')[4])
});
