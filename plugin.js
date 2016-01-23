var pjson = require('./package.json'),
    plugin = module.exports = {},
    format;

// Do we need this? Are there other plugin-y config things?
plugin.config = {
    platform: 'rpi'
};

// TODO: should this be a constant, supplied by a base module?
// plugin.type = 'FORMAT';

/**
 * If this plugin is adding a new artwork format, the format definition
 * should be included as a 'format' property on the plugin object.
 *
 * Each format must have a unique name.
 *
 * In order to make this format available, it will be referenced
 *
 * @type {Object}
 */
format = {
    // the name should be the same as the package name
    'name': pjson.name,
    'display_name': 'Shader',
    'download': true,
    // TODO: should we support some predefined string replacements? like $filepath? or $url?
    'start_command': 'glslViewer $filepath',
    'end_command': 'sudo pkill glslViewer',
    'tags': ['shader']
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
    console.log('=======>   Openframe-glslViewer initialized!   <=======');
    fc.addFormat(format);
};
