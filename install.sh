#!/bin/bash
#
# Be VERY Careful. This script may be executed with admin privileges.

echo "Hello Openframe (ExamplePlugin install.sh)"

os=$(uname)
arq=$(uname -m)

# glslViewer will get cloned into 'player' dir
mkdir player
cd player

if [ $os == "Linux" ]; then

    # on Debian Linux distributions
    sudo apt-get update
    # do we really want to upgrade? this could take a damn long time.
    sudo apt-get upgrade

    # on RaspberryPi
    if [ $arq == "armv7l" ]; then
        git clone http://github.com/patriciogonzalezvivo/glslViewer
        cd glslViewer
        make
        sudo make install
    else
        sudo apt-get install git-core cmake xorg-dev libglu1-mesa-dev
        git clone https://github.com/glfw/glfw.git
        cd glfw
        cmake .
        make
        sudo make install
        cd ..
        git clone http://github.com/patriciogonzalezvivo/glslViewer
        cd glslViewer
        make
        sudo make install
    fi


elif [ $os == "Darwin" ]; then

    # ON MacOX
    if [ ! -e /usr/local/bin/brew ]; then
        ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    fi

    brew update
    # do we really want to upgrade? this could take a damn long time.
    brew upgrade
    brew tap homebrew/versions
    brew install glfw3 pkg-config
    git clone http://github.com/patriciogonzalezvivo/glslViewer
    cd glslViewer
    make
    make install
fi
