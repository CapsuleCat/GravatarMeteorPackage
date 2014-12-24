Package.describe( {
  name: 'idmontie:gravatar',
  summary: 'Gravatar package for Meteor',
  version: '1.0.1',
  license: 'MIT',
  git: 'https://github.com/idmontie/gravatar.git'
} )

Package.onUse( function ( api ) {
  'use strict';

  api.versionsFrom( '1.0.2' )
  api.addFiles( 'idmontie:gravatar.js' )
});

Package.onTest( function ( api ) {
  'use strict';

  api.use( 'tinytest' )
  api.use( 'idmontie:gravatar' )
  api.addFiles( 'lib/md5.js' )
  api.addFiles( 'idmontie:gravatar-tests.js' )
});
