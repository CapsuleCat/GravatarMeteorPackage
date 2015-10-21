Meteor Gravatars
================

[![Travis](https://img.shields.io/travis/idmontie/meteor-gravatar.svg?style=flat)](https://travis-ci.org/idmontie/meteor-gravatar) 
[![GitHub license](https://img.shields.io/:license-mit-blue.svg?style=flat)](https://github.com/idmontie/gravatar/blob/master/LICENSE.md)

Gravatar API functionality for Meteor.

# Install

```
$ meteor add idmontie:gravatar
```

# Usage

Grab [Gravatar](https://en.gravatar.com/) images or profiles.

The following are available for you to use:

* `Gravatar.hash(email)`
* `Gravatar.imageUrlFromEmail(email, options)`
* `Gravatar.imageUrl(options)` - in case you want to use precomputed hashes
* `Gravatar.profileUrlFromEmail(email, options)`
* `Gravatar.profileUrl(options)` - in case you want to use precomputed hashes


This project add `Gravatars` to the `this` context for the server and client.  The following methods are provided with example usage:

## hash

`Gravatar.hash( email )`

```
Trims the given string, toLowerCase()s it, and then md5s the email
```

Example:

```js
Gravatar.hash( 'idmontie@asu.edu' ) === 'de2fe4e58ee0f9fc1c1c1a71feeab8f8'
```

## imageUrlFromEmail

`Gravatar.imageUrlFromEmail( email, options )`

```
Creates a gravatar image url for the given email and options.
The email will be hashed using the Gravatar.hash() function.
```

See [imageUrl](#imageurl) for `options` documentation.

Example:

```js
Gravatar.imageUrlFromEmail( 'idmontie@asu.edu' ) === 'http://www.gravatar.com/avatar/de2fe4e58ee0f9fc1c1c1a71feeab8f8'
```

Another Example:

**server.js**
```js
Template.home.helpers( {
  gravatarUrl : function () {
    return Gravatar.imageUrlFromEmail( 'idmontie@asu.edu' )
  }
} )
```

**template.html**
```html
<template nme="home">
  <img src="{{gravatarUrl}}" />
</template>
```

## imageUrl

`Gravatar.imageUrl( options )`

```
Given a set of options, will generate a gravatar image url.

Options:
- hash String
    You can generate this with Gravatar.hash()
- size Number (Optional)
    Sets the size of the gravatar in pixels.
    Anywhere from 1 to 2048.

- gDefault String (Optional)
    Called gDefault since default is a keyword.
    An absolute URL, we'll encode it for you 
    or it can be a Gravatar.DEFAULTS

- forceDefault Boolean (Optional)
    Forces gDefault to be used

- rating Gravitar.RATINGS [String] (Optional)
    g: suitable for display on all websites with any audience type.
    pg: may contain rude gestures, provocatively dressed individuals, the lesser swear words, or mild violence.
    r: may contain such things as harsh profanity, intense violence, nudity, or hard drug use.
    x: may contain hardcore sexual imagery or extremely disturbing violence.

- secure Boolean (Optional)
    Forces use of HTTPS
```

Example:

```js
Gravatar.imageUrl( {
  hash : 'de2fe4e58ee0f9fc1c1c1a71feeab8f8',
  size : 32,
  gDefault : Gravatar.DEFAULTS['404'],
  forceDefault : false,
  rating : Gravatar.RATINGS.g,
  secure : true
} ) === 'https://secure.gravatar.com/avatar/de2fe4e58ee0f9fc1c1c1a71feeab8f8?s=32&d=404&r=g'
```

## profileUrlFromEmail

`Gravatar.profileUrlFromEmail( email, options )`

```
Creates a gravatar profile script url for the given email and options.
The email will be hashed using the Gravatar.hash() function.
```

See [profileUrl](#profileurl) for `options` documentation.

Example:

```js
Gravatar.profileUrlFromEmail( 'idmontie@asu.edu' ) === 'http://www.gravatar.com/avatar/de2fe4e58ee0f9fc1c1c1a71feeab8f8'
```

Another example:

**server.js**
```js

if (Meteor.isServer) {
  Meteor.methods({
    gravatarProfile: function () {
      this.unblock();
      return Meteor.http.call("GET", Gravatar.profileUrlFromEmail( 'idmontie@asu.edu' ) );
    }
  });
}

```


## profileUrl

`Gravatar.profileUrl( options )`

```
Given a set of options, will generate a gravatar image url.

Options:
- hash String
    You can generate this with Gravatar.hash(
- callback String
    The name as a string of a global function

- secure Boolean (Optional)
    Forces use of HTTPS
```

Example:

```js
Gravatar.profileUrl( {
  hash : 'de2fe4e58ee0f9fc1c1c1a71feeab8f8',
  callback: 'alert'
} ) === 'https://secure.gravatar.com/avatar/de2fe4e58ee0f9fc1c1c1a71feeab8f8?callback=alert'
```