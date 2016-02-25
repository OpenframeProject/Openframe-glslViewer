var pjson = require('./package.json'),
    debug = require('debug')('openframe:glslViewer'),
    extension = module.exports = {};

/**
 * Extension initialization method.
 *
 * Called when the extension (and its dependencies) have been installed.
 *
 * @param  {object} OF An interface provided to extensions giving limited access to the frame environment
 */
extension.init = function(OF) {
    // do your extension thing
    debug('=======>   Openframe-glslViewer initialized!   <=======');

    /**
     * Extensions can add new artwork formats to the frame.
     *
     * Each format must have a unique name, which should correspond to the
     * name of the npm package.
     */
    OF.addFormat(
        {
            // the name should be the same as the npm package name
            'name': pjson.name,
            // displayed to the user, perhaps?
            'display_name': 'Shader',
            // does this type of artwork need to be downloaded to the frame?
            'download': true,
            // how do start this type of artwork? currently two token replacements, $filepath and $url
            'start_command': 'glslViewer $filepath',
            // how do we stop this type of artwork?
            'end_command': 'pkill glslViewer'
        }
    );
};
