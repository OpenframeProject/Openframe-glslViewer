var assert = require('assert'),
    Extension = require('openframe-extension'),
    GlslExtension = require('../extension');

describe('instantiation', function() {
    it('should be an instance of type Extension', function() {
        assert(GlslExtension instanceof Extension);
    });
});

describe('properties', function() {
    it('should include all required format properties', function() {
        var format = GlslExtension.props.format;

        assert(format.name);
        assert(typeof format.name === 'string');

        assert(format.display_name);
        assert(typeof format.display_name === 'string');

        assert(format.download !== undefined);
        assert(typeof format.download === 'boolean');

        assert(format.start_command);
        assert(typeof format.start_command === 'string' || typeof format.start_command === 'function');

        if (typeof format.start_command === 'function') {
            assert(typeof format.start_command() === 'string');
        }

        assert(format.end_command);
        assert(typeof format.end_command === 'string');
    });

    it('should use w and h properties to set -w and -h flags in start_command', function() {
        var format = GlslExtension.props.format,
            config = {
                w: 1000,
                h: 1000
            },
            command = format.start_command(config);

        assert(typeof command === 'string');
        assert(command.indexOf('-w 1000') !== -1);
        assert(command.indexOf('-h 1000') !== -1);
    });
});
