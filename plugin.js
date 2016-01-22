
var plugin = module.exports = {};

plugin.config = {
    platform: 'rpi'
};

plugin.formats = [{
  "name": "Shader (glslViewer)",
  "download": true,
  "start_command": "glslViewer $filename",
  "end_command": "sudo pkill glslViewer",
  "category": "shader"
}];

plugin.dependencies = {
  // "openframe-gpio": "git+https://git@github.com/OpenframeProject/Openframe-PluginExample.git"
};

// Must return a Promise that resolves on successful intialization
plugin.init = function(fc) {
    // do your plugin thing
    console.log('=======>   PluginExample initialized!   <=======');
};
