var plugin = module.exports = {};

// Do we need this? Are there other plugin-y config things?
plugin.config = {
    platform: 'rpi'
};

// OPTIONAL - an array of Format objects
//
// TODO - how will these get handled in terms of adding artwork?
plugin.formats = [{
  "name": "Shader (glslViewer)",
  "download": true,
  // TODO: should we support some predefined string replacements? like $filename? or $url?
  "start_command": "glslViewer $filename",
  "end_command": "sudo pkill glslViewer",
  "category": "shader"
}];

// TODO - Do we want this? Or can we rely on the deps from package.json?
plugin.dependencies = {
  // "openframe-gpio": "git+https://git@github.com/OpenframeProject/Openframe-PluginExample.git"
};

/**
 * Plugin initialization method.
 *
 * Called when the plugin (and its dependencies) have been installed.
 *
 * TODO: This will likely get passed a sandboxed API object rather than the full frame controller...
 *
 * @param  {object} fc A reference to the frame controller
 */
plugin.init = function(fc) {
    // do your plugin thing
    console.log('=======>   Openframe-GlslViewer initialized!   <=======');
};
