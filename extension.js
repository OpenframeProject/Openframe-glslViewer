var pjson = require('./package.json'),
    Extension = require('openframe-extension');

/**
 * Extensions should expose an instance of the Extension class.
 *
 * For info on building extensions, see [Openframe-Extension](https://github.com/OpenframeProject/Openframe-Extension).
 */

module.exports = new Extension({
    format: {
        // the name should be the same as the npm package name
        'name': pjson.name,
        // displayed to the user, perhaps?
        'display_name': 'Shader',
        // does this type of artwork need to be downloaded to the frame?
        'download': false,
        // how do start this type of artwork? currently two token replacements, $filepath and $url
        'start_command': 'glslLoader $url --fullscreen',
        // how do we stop this type of artwork?
        'end_command': 'pkill glslViewer'
    }
});
