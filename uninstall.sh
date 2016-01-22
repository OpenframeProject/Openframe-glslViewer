#!/bin/bash
#
# Be VERY Careful. This script may be executed with admin privileges.

echo "Installing glslViewer..."

os=$(uname)
arq=$(uname -m)

# glslViewer will get cloned into 'player' dir
rm -r ./player

gv=$(which glslViewer)
rm $gv

if [ $os == "Linux" ]; then

    # on Debian Linux distributions

    if [ $arq == "armv7l" ]; then
        # on RaspberryPi

    else
        # Non-arm7 Debian...
    fi


elif [ $os == "Darwin" ]; then
    # ON MacOX

fi
