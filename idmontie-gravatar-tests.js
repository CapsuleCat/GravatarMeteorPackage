/* global Gravatar */

Tinytest.add('example', function ( test ) {
  'use strict';

  test.equal( true, true );
});

Tinytest.add( 'hash should return a hash of the trimmed, lower case version of the email', function ( test ) {
  'use strict';

  var hash0 = Gravatar.hash( 'MyEmailAddress@example.com' )
  test.equal( hash0, '0bc83cb571cd1c50ba6f3e8a78ef1346' )

  var hash1 = Gravatar.hash( 'MyEmailAddress@example.com    ' )
  test.equal( hash1, '0bc83cb571cd1c50ba6f3e8a78ef1346' )

  var hash2 = Gravatar.hash( 'myemailaddress@example.com' )
  test.equal( hash2, '0bc83cb571cd1c50ba6f3e8a78ef1346' )

  var hash3 = Gravatar.hash( 'idmontie@asu.edu' )
  test.equal( hash3, 'de2fe4e58ee0f9fc1c1c1a71feeab8f8' )
});


Tinytest.add( 'imageUrl without options should return url', function ( test ) {
  'use strict';

  var url = Gravatar.imageUrl()
  test.equal( url, 'http://www.gravatar.com/avatar/')
});

Tinytest.add( 'imageUrlFromEmail with email should return url', function ( test ) {
  'use strict';

  var url = Gravatar.imageUrlFromEmail( 'idmontie@asu.edu' )
  test.equal( url, 'http://www.gravatar.com/avatar/de2fe4e58ee0f9fc1c1c1a71feeab8f8' )
} )

Tinytest.add( 'imageUrl with options should return url', function ( test ) {
  'use strict';

  var url = Gravatar.imageUrl( {
    hash : 'de2fe4e58ee0f9fc1c1c1a71feeab8f8',
    size : 32,
    gDefault : Gravatar.DEFAULTS['404'],
    forceDefault : false,
    rating : Gravatar.RATINGS.g,
    secure : true
  } )

  test.equal( url, 'https://secure.gravatar.com/avatar/de2fe4e58ee0f9fc1c1c1a71feeab8f8?s=32&d=404&r=g' )
} )

Tinytest.add( 'profileUrlFromEmail with email should return url', function ( test ) {
  'use strict';

  var url = Gravatar.profileUrlFromEmail( 'idmontie@asu.edu' )
  test.equal( url, 'https://secure.gravatar.com/avatar/de2fe4e58ee0f9fc1c1c1a71feeab8f8' )
} )

Tinytest.add( 'profileUrl with optoins should return url', function ( test ) {
  'use strict';

  var url = Gravatar.profileUrl( {
    hash : 'de2fe4e58ee0f9fc1c1c1a71feeab8f8',
    callback: 'alert'
  } )
  test.equal( url, 'https://secure.gravatar.com/avatar/de2fe4e58ee0f9fc1c1c1a71feeab8f8?callback=alert' )
} )
