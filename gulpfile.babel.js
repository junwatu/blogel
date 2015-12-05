'use strict'

import gulp from 'gulp'
import mocha from 'gulp-mocha'
import rethinkdb from './test/rethinkdb'

gulp.task('default', () => console.log('Default Task'))
gulp.task('test', () => {
  let stopRdb = rethinkdb()
  let delay = 7500
  setTimeout(() => {
    gulp.src('test/*.spec.js')
      .pipe(mocha({
        reporte: 'spec',
        require: ['babel-core/register']
      }))
      .on('end', () => {
        setTimeout(() => {
          stopRdb()
        }, delay)
      })
  }, delay)
})
