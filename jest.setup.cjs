// Configure test environment
require('dotenv').config({
    path: '.env.test',
});

// Required for inversify!
require('reflect-metadata');

require('@quicker/__mocks__/storage');
require('fake-indexeddb/auto');
