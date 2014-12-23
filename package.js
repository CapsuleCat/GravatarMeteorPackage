Package.describe({
  name: 'idmontie:gravatar',
  summary: 'Gravatar package for Metor',
  version: '1.0.1',
  git: 'https://github.com/idmontie/gravatar.git'
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
