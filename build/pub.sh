#!/bin/sh

cd packages/$1 || exit

yarn run pub --registry https://registry.npmjs.org
