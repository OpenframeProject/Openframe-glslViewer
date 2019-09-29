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
        # on RaspberryPi 2/3/4

        # check if it's a pi 4, if so requires a different install
        rev=$(cat /proc/cpuinfo | grep 'Revision' | awk '{print $3}' | sed 's/^1000//')
        declare -A pi4
        pi4[a03111]=1
        pi4[b03111]=1
        pi4[c03111]=1
        if [ ${pi4[$rev]} == 1 ]; then
            sudo apt-get install libegl1-mesa-dev libgbm-dev libgles2-mesa-dev
            git clone --depth=1 --branch=master http://github.com/patriciogonzalezvivo/glslViewer glslViewer
            cd glslViewer
            make
            sudo make install
        else
            sudo apt-get install glslviewer
        fi
    elif [ $arq == "armv6l" ]; then
        # on RaspberryPi A/B
        sudo apt-get install glslviewer
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
