'use strict';
const config = require('conventional-changelog-conventionalcommits');

module.exports = config({
  issuePrefixes: ['#KUW-', 'KUW-'],
  issueUrlFormat: 'https://bktechouse.atlassian.net/browse/KUW-{{id}}',
});
