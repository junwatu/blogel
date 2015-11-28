#!/bin/bash

if [ ! -d 'public/css/themes' ] ; then
    mkdir public/css/themes
fi
cp -v ./node_modules/medium-editor/dist/css/medium-editor.css public/css
cp -rvf ./node_modules/medium-editor/dist/css/themes/default.css public/css/themes

if [ ! -d 'public/js' ] ; then
    mkdir -p public/js/vendor
fi
cp -v ./node_modules/t3js/dist/t3-2.0.2.js public/js/vendor
