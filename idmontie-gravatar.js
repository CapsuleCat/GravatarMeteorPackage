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

Gravatar = {
  BASE_IMAGE_URL : 'gravatar.com/avatar/',
  HTTP_PREFIX : 'http://www.',
  HTTPS_PREFIX : 'https://secure.',
  DEFAULTS : {
    404 : '404',
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
  },
  /**
   * Trims, lower cases, and then md5 the given email
   *
   * @param String email
   * @return hash as String
   */
  hash : function ( email ) {
    'use strict';

    if ( email == null || typeof email !== 'string' ) {
      throw new Error( 'Email is not string.' )
    }

    email = email.trim()
    email = email.toLowerCase()

    return md5( email )
  },
  /**
   * Given a set of options, will generate a gravatar image url.
   *
   * Options:
   * - hash String
   *     You can generate this with Gravatar.hash()
   * - size Number (Optional)
   *     Sets the size of the gravatar in pixels.
   *     Anywhere from 1 to 2048.
   *
   * - gDefault String (Optional)
   *     Called gDefault since default is a keyword.
   *     An absolute URL, we'll encode it for you
   *     or it can be a Gravatar.DEFAULTS
   *
   * - forceDefault Boolean (Optional)
   *     Forces gDefault to be used
   *
   * - rating Gravitar.RATINGS [String] (Optional)
   *     g: suitable for display on all websites with any audience type.
   *     pg: may contain rude gestures, provocatively dressed individuals, the lesser swear words, or mild violence.
   *     r: may contain such things as harsh profanity, intense violence, nudity, or hard drug use.
   *     x: may contain hardcore sexual imagery or extremely disturbing violence.
   *
   * - secure Boolean (Optional)
   *     Forces use of HTTPS_PREFIX
   *
   * @param Object options
   * @return String
   */
  imageUrl : function ( options ) {
    'use strict';

    options    = _.extend( {}, Gravatar.EMAIL_OPTIONS, options )
    var base   = Gravatar.BASE_IMAGE_URL + options.hash
    var params = []

    // =============
    // Secure option
    // =============
    if ( options.secure ) {
      base = Gravatar.HTTPS_PREFIX + base
    } else {
      base = Gravatar.HTTP_PREFIX + base
    }

    // ===========
    // Size option
    // ===========
    if ( options.size !== false ) {
      options.size = parseInt( options.size, 10 )

      if ( typeof options.size !== 'number' ) {
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
      } else if ( ! ( options.gDefault in Gravatar.DEFAULTS ) ) {
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
      if ( ! ( options.rating in Gravatar.RATINGS ) ) {
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
  /**
   * Creates a gravatar image url for the given email and options.
   *
   * The email will be hashed using the Gravatar.hash() function.
   *
   * @param String email
   * @param Object options
   * @see imageUrl
   */
  imageUrlFromEmail : function ( email, options ) {
    'use strict';

    var hash = Gravatar.hash( email )
    options  = _.extend( {}, Gravatar.IMAGE_OPTIONS, options, { hash : hash } )

    return Gravatar.imageUrl( options )
  },
  /**
   * Given a set of options, will generate a gravatar profile url.
   *
   * Options:
   * - hash String
   *     You can generate this with Gravatar.hash()
   *
   * - callback String
   *     The name as a string of a global function
   *
   * @param Object options
   * @return String
   */
  profileUrl : function ( options ) {
    'use strict';

    options    = _.extend( {}, Gravatar.PROFILE_OPTIONS, options )
    var base   = Gravatar.HTTPS_PREFIX + Gravatar.BASE_IMAGE_URL + options.hash
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
        value : options.callback
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
  /**
   * Creates a gravatar profile script url for the given email and options.
   * The email will be hashed using the Gravatar.hash() function.
   *
   * @param String email
   * @param Object options
   */
  profileUrlFromEmail : function ( email, options ) {
    'use strict';

    var hash = Gravatar.hash( email )
    options  = _.extend( {}, Gravatar.PROFILE_OPTIONS, options, { hash : hash } )

    return Gravatar.profileUrl( options )
  }
};
