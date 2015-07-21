#!/bin/bash
# Create temporary directory dan transpile es6 js files.
# 
# MIT (c) 2015  Equan Pr.
export TEMP_DIR=./tmp
export RECURSE_DIR=server
export NODE_TRANSPILER=scripts/tools/node-transpiler

transpile_recurse() {
 for i in "$1"/*;do
    if [ -d "$i" ];then
        if [ ! -d "$TEMP_DIR/$i" ] ; then
           y=$i
           mkdir -p "$TEMP_DIR/${y#*/}"
        fi
        transpile_recurse "$i"
    elif [ -f "$i" ]; then
        x=$i
        node "$NODE_TRANSPILER"/bin/transpile "$i" > "$TEMP_DIR/${x#*/}"
    fi
 done
}

transpile_recurse server