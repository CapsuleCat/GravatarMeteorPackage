Package.describe( {
  name: 'idmontie:gravatar',
  summary: 'Gravatar package for Meteor',
  version: '1.0.2',
  license: 'MIT',
  git: 'https://github.com/idmontie/gravatar.git'
} )

var packageFiles = [
  'lib/md5.js',
  'idmontie-gravatar.js'
];

Package.onUse( function ( api ) {
  'use strict';

  api.versionsFrom( '1.0.2' )
  api.use( 'underscore' )
  api.addFiles( packageFiles )
});

Package.onTest( function ( api ) {
  'use strict';

  api.use( 'tinytest' )
  api.use( 'underscore' )
  api.addFiles( packageFiles )
  api.addFiles( 'idmontie-gravatar-tests.js' )
});
