#!/bin/bash
# Create temporary directory dan transpile es6 js files.
# 
# MIT (c) 2015  Equan Pr.

set RECURSE_DIR=server
set TEMP_DIR=.tmp
set NODE_TRANSPILER=scripts/tools/node-transpiler

transpile_recurse() {
 for i in "$1"/*;do
    if [ -d "$i" ];then
        if [ ! -d "$TEMP/$i" ] ; then
           y=$i
           mkdir -p "$TEMP/${y#*/}"
        fi
        transpile_recurse "$i"
    elif [ -f "$i" ]; then
        x=$i
        node "$NODE_TRANSPILER"/bin/transpile "$i" > "$TEMP/${x#*/}"
    fi
 done
}

transpile_recurse server