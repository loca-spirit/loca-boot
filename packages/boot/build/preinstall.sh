#!/bin/sh
echo 'preinstall'
mkdir 'packages/common/lib'
mkdir 'packages/common/lib/config'
cp -av packages/common/src/config/** packages/common/lib/config

tsc -b packages/common packages/core packages/service
