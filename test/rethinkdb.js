var spawn = require('child_process').spawn

module.exports = function start (cwd) {
  var options = {}
  if (cwd) {
    options.cwd = cwd
  }

  var rethinkdb = spawn('rethinkdb', options)

  rethinkdb.stdout.setEncoding('utf8')

  rethinkdb.stdout.on('data', function (message) {
    process.stdout.write('rethinkdb: ' + message)
  })

  rethinkdb.stderr.setEncoding('utf8')

  rethinkdb.stderr.on('data', function (message) {
    process.stderr.write('rethinkdb error: ' + message)
  })

  return function stop () {
    console.log('stopping rethinkdb')
    rethinkdb.kill('SIGKILL')
  }
}
