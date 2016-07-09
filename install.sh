#!/bin/bash
#
# Be VERY Careful. This script may be executed with admin privileges.

echo "Installing glslViewer..."

if ! [ -z "$TRAVIS" ]; then
    echo "TRAVIS env, don't install"
    exit 0
fi

os=$(uname)
arq=$(uname -m)

# if glslViewer is already present, don't continue
if hash glslViewer 2>/dev/null; then
    exit 0
fi

if [ $os == "Linux" ]; then

    # on Linux distributions
    # sudo apt-get update
    # do we want to upgrade? this could take a damn long time.
    # sudo apt-get upgrade

    if [ $arq == "armv7l" ]; then
        # on RaspberryPi 2/3
        sudo ln -s `pwd`/bin/glslViewer-armv7l /usr/local/bin/glslViewer
        sudo chmod +x /usr/local/bin/glslViewer
    elif [ $arq == "armv6l" ]; then
        # on RaspberryPi A/B
        sudo ln -s `pwd`/bin/glslViewer-armv6l /usr/local/bin/glslViewer
        sudo chmod +x /usr/local/bin/glslViewer
    else
        sudo apt-get install git-core cmake xorg-dev libglu1-mesa-dev
        git clone https://github.com/glfw/glfw.git
        cd glfw
        cmake .
        make
        sudo make install
        cd ..
        git clone --depth=1 --branch=master http://github.com/patriciogonzalezvivo/glslViewer glslViewer
        cd glslViewer
        make
        sudo make install
    fi


elif [ $os == "Darwin" ]; then

    # ON MacOX
    echo "osx"

    if [ ! -e /usr/local/bin/brew ]; then
        ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    fi

    brew update
    # do we really want to upgrade? this could take a damn long time.
    brew upgrade
    brew tap homebrew/versions
    brew install glfw3 pkg-config
    git clone --depth=1 --branch=master http://github.com/patriciogonzalezvivo/glslViewer glslViewer
    rm -rf !$/.git
    cd glslViewer
    make
    make install
fi
