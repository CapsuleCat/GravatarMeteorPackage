// Write your tests here!
// Here is an example.
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
});


Tinytest.add( 'imageUrl without options should return url', function ( e ) {
  'use strict';

  var url = Gravatar.imageUrl()
  test.equal( url, 'http://www.gravatar.com/avatar/')
})