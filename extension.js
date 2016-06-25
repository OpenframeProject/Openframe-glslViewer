var pjson = require('./package.json'),
    fs = require('fs'),
    https = require('https'), // https Server
    path = require("path"),
    exec = require('child_process').execSync,
    debug = require('debug')('openframe:glslviewer'),
    Extension = require('openframe-extension');

/**
 * Extensions should expose an instance of the Extension class.
 *
 * For info on building extensions, see [Openframe-Extension](https://github.com/OpenframeProject/Openframe-Extension).
 */

function download(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};

module.exports = new Extension({
    format: {
        // the name should be the same as the npm package name
        'name': pjson.name,
        // displayed to the user, perhaps?
        'display_name': 'Shader',
        // does this type of artwork need to be downloaded to the frame?
        'download': true,
        // how do start this type of artwork? currently two token replacements, $filepath and $url
        'start_command': function(_config, _tokens) {
            debug('Artwork config: ', _config);

            var config = _config || {},
                command = 'glslViewer';

            console.log(_tokens['$filepath'], path.resolve("./"));
            var lines = fs.readFileSync(_tokens['$filepath']).toString().split('\n');
            var counter = 0;
            for (var i = 0; i < lines.length; i++) {
                var match = lines[i].match(/uniform\s*sampler2D\s*([\w]*);\s*\/\/\s*([\w|\:\/\/|\.|\-|\_]*)/i);
                if (match) {
                    var ext = match[2].split('.').pop();
                    if (match[1] &&  match[2] && 
                        (ext === 'jpg' || ext === 'JPG' ||
                         ext === 'jpeg' || ext === 'JPEG' ||
                         ext === 'png' || ext === 'PNG')) {
                        var imageFile = counter.toString() + '.' + ext;
                        counter++;
                        exec('touch '+imageFile);
                        download(match[2],imageFile, function() { 
                            console.log('Finish dowloading file');
                        });
                        command += ' -' + match[1] + ' ' + path.resolve("./") + '/' + imageFile;
                    }
                } else {
                    var main = lines[i].match(/\s*void\s*main\s*/g);
                    if (main) {
                        console.log('Main function start at line',i);
                        break;
                    }
                }
            }
            
            if (config.w) {
                command += ' -w ' + config.w;
            }
            if (config.h) {
                command += ' -h ' + config.h;
            }
            
            command += ' $filepath';
            console.log('### COMMAND LINE:',command);
            return command;
        },
        // how do we stop this type of artwork?
        'end_command': 'pkill glslViewer'
    }
});
