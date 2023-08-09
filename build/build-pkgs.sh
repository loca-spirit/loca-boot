#!/bin/sh

cd packages/$1 || exit

yarn run build-pkgs
