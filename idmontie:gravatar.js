/**
 * Meteor Gravatars
 *
 * Gravatar package for meteor
 *
 * Requires Underscores
 *
 * @author idmontie
 */

 /* global md5 */

 var _$ = this;

_$.Gravatar = {
  BASE_IMAGE_URL : 'gravatar.com/avatar/',
  HTTP_PREFIX : 'http://www.',
  HTTPS_PREFIX : 'https://secure.',
  DEFAULTS : {
    '404 ': '404',
    mm : 'mm',
    identicon : 'identicon',
    wavatar : 'wavatar',
    retro : 'retro',
    blank : 'blank'
  },
  RATINGS : {
    g : 'g',
    pg : 'pg',
    r : 'r',
    x : 'x'
  },
  EMAIL_OPTIONS : {
    /**
     * anywhere from 1 to 2048
     *
     * @type Number
     */
    size : false,
    /**
     * Called gDefault since default is a keyword
     *
     * an absolute URL, we'll encode it for you OR it can be a Gravatar.DEFAULTS
     *
     * @type String
     */
    gDefault : false,
    /**
     * @type Boolean
     */
    forceDefault : false,
    /**
     * @type Gravatar.RATINGS
     */
    rating : false,
    /**
     * @type Boolean
     */
    secure : false,
    /*
     * @type String
     */
    hash : ''
  },
  PROFILE_OPTIONS : {
    /**
     * @type Function
     */
    callback : false,
    hash : ''
  }
  hash : function ( email ) {
    'use strict';

    if ( email == null || typeof email !== 'string' ) {
      throw new Error( 'Email is not string.' )
    }

    email = email.trim()
    email = email.toLowerCase()

    return md5( email )
  },
  imageUrl : function ( options ) {
    'use strict';

    options    = _.extend( {}, _$.Gravatar.EMAIL_OPTIONS, options )
    var base   = _$.Gravatar.BASE_IMAGE_URL + options.hash
    var params = []

    // =============
    // Secure option
    // =============
    if ( options.secure ) {
      base = _$.Gravatar.HTTPS_PREFIX + base
    } else {
      base = _$.Gravatar.HTTP_PREFIX + base
    }

    // ===========
    // Size option
    // ===========
    if ( options.size !== false ) {
      options.size = parseInt( options.size, 10 )

      if ( typeof options.sizze !== 'number' ) {
        throw new Error( 'Size is not a number.' )
      }

      if ( options.size < 1 || options.size > 2048 ) {
        throw new Error( 'Size is outside of range: [1,2048].' )
      }

      params.push( {
        name : 's',
        value : options.size
      } )
    }

    // ==============
    // Default option
    // ==============
    if ( options.gDefault !== false ) {
      if ( options.gDefault.indexOf( 'http' ) === 0 ) {
        options.gDefault = encodeURIComponent( options.gDefault )
      } else if ( ! ( options.gDefault in _$.Gravatar.DEFAULTS ) ) {
        throw new Error ( 'gDefault is not a url or a valid option.' )
      }

      params.push( {
        name : 'd',
        value : options.gDefault
      } )
    }

    // ====================
    // Force Default option
    // ====================
    if ( options.forceDefault ) {
      params.push( {
        name : 'f',
        value : 'y'
      } )
    }

    // =============
    // Rating option
    // =============
    if ( options.rating !== false ) {
      if ( ! ( options.rating in _$.Gravatar.RATINGS ) ) {
        throw new Error( 'Rating is not a valid option' )
      }

      params.push( {
        name : 'r',
        value : options.rating
      } )
    }

    // join the params
    if ( params.length > 0 ) {
      base += '?'

      for ( var i = 0; i < params.length; i++ ) {
        if ( i !== 0 ) {
          base += '&'
        }

        base += params[i].name + '=' + params[i].value
      }
    }

    return base
  },
  imageUrlFromEmail : function ( email, options ) {
    'use strict';

    var hash = _$.Gravatar.hash( email )
    options  = _.extend( {}, _$.Gravatar.IMAGE_OPTIONS, options, { hash : hash } )

    return _$.Gravatar.imageUrl( options )
  },
  profileUrl : function ( options ) {
    'use strict';

    options    = _.extend( {}, _$.Gravatar.PROFILE_OPTIONS, options )
    var base   = _$.Gravatar.HTTPS_PREFIX + _$.Gravatar.BASE_IMAGE_URL + options.hash
    var params = []

    // =============
    // Callback option
    // =============
    if ( options.callback !== false ) {
      if ( typeof options.callback !== 'string' ) {
        throw new Error( 'Callback is not a string' )
      }

      params.push( {
        name : 'callback',
        value : options.rating
      } )
    }

    // join the params
    if ( params.length > 0 ) {
      base += '?'

      for ( var i = 0; i < params.length; i++ ) {
        if ( i !== 0 ) {
          base += '&'
        }

        base += params[i].name + '=' + params[i].value
      }
    }

    return base
  },
  profileUrlFromEmail : function ( email, options ) {
    'use strict';

    var hash = _$.Gravatar.hash( email )
    options  = _.extend( {}, _$.Gravatar.PROFILE_OPTIONS, options, { hash : hash } )

    return _$.Gravatar.profileUrl( options )
  }
};
