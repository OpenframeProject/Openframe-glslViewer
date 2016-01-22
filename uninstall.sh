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

        # ####
        #
        # FOR NOW, CODE GOES HERE since we're shooting for RPi support
        #
        # ####
        echo "armv7l"


    else
        # Non-arm7 Debian...
        echo "non armv7l"
    fi

elif [ $os == "Darwin" ]; then
    # OSX
    echo "osx"
fi
