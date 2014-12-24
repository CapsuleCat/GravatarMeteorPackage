/**
 * Meteor Gravatars
 *
 * Gravatar package for meteor
 *
 * Requires Underscores
 *
 * @author idmontie
 */

this.Gravatar = {
  BASE_URL : 'gravatar.com/avatar/',
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
  OPTIONS : {
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
    forceDefault : false,
    rating : false,
    secure : false
  },
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

    var o = _.extend( {}, Gravatar.OPTIONS, options )
    var base =  Gravatar.BASE_URL + options.hash
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
      options.size = parseInt( options.size )

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
      } else if ( options.gDefault in Gravatar.DEFAULTS ) {
        // Nothing for now
      } else {
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
      if ( ! options.rating in Gravatar.RATINGS ) {
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
        if ( i != 0 ) {
          base += '&'
        }

        base += params[i].name + '=' + params[i].value
      }
    }

    return base
  },
  imageUrlFromEmail : function ( email, options ) {
    'use strict';

    var hash = Gravatar.hash( email )
    var options = _.extend( {}, Gravatar.OPTIONS, { hash : hash } )

    return Gravatar.imageUrl( options )
  }
};