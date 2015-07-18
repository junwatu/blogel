#!/bin/bash

cp -v ./node_modules/medium-editor/dist/js/medium-editor.min.js public/js 
if [ ! -d 'public/css/themes' ] ; then
    mkdir public/css/themes
fi
cp -v ./node_modules/medium-editor/dist/css/medium-editor.css public/css
cp -rvf ./node_modules/medium-editor/dist/css/themes/default*.css public/css/themes