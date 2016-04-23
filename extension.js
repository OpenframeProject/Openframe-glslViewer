var pjson = require('./package.json'),
    debug = require('debug')('openframe:glslviewer'),
    Extension = require('openframe-extension');

/**
 * Extension initialization method.
 *
 * Called when the extension (and its dependencies) have been installed.
 *
 * @param  {object} OF An interface provided to extensions giving limited access to the frame environment
 */

module.exports = new Extension({
    format: {
        // the name should be the same as the npm package name
        'name': pjson.name,
        // displayed to the user, perhaps?
        'display_name': 'Shader',
        // does this type of artwork need to be downloaded to the frame?
        'download': true,
        // how do start this type of artwork? currently two token replacements, $filepath and $url
        'start_command': function(_config) {
            debug('Artwork config: ', _config);
            var config = _config || {},
                command = 'glslViewer';
            if (config.w) {
                command += ' -w ' + config.w;
            }
            if (config.h) {
                command += ' -h ' + config.h;
            }
            command += ' $filepath';
            return command;
        },
        // how do we stop this type of artwork?
        'end_command': 'pkill glslViewer'
    }
});
