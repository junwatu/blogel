'use strict'

import gulp from 'gulp'
import mocha from 'gulp-mocha'
import gutil from 'gulp-util'
import webpack from 'webpack'

import rethinkdb from './test/rethinkdb'
import { init } from './server/db.js'

gulp.task('default', () => console.log('Default Task'))
gulp.task('test', () => {
  let stopRdb = rethinkdb()
  setTimeout(() => {
    init()
  }, 2500)

  let delay = 10000

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

gulp.task('webpack', () => {
  let conf = {}
  webpack(conf, (err, stats) => {
    if(err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString())
  })
})
