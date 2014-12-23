Package.describe({
  name: 'idmontie:gravatar',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2');
  api.addFiles('idmontie:gravatar.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('idmontie:gravatar');
  api.addFiles('idmontie:gravatar-tests.js');
});
