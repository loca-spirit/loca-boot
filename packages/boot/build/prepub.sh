#!/bin/sh
echo 'prepub11111'

cd packages/common/lib || exit
mkdir config
cd ../../../
cp -av packages/common/src/config/** packages/common/lib/config

lerna publish --no-git-tag-version
