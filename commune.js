var
	http        = require( 'http' ),
	util        = require( 'util' ),
	config      = require( './config' ),
	querystring = require( 'querystring' ),
	dictionary  = [],
	server      = {}
;


module.exports = {

	start_server: function( dict ){
		dictionary = dict;

		// Create server once modules have been loaded and a dictionary returned
		server = http.createServer( function( request, response ){
			if( request.method == 'POST' ) on_post( request, response );
			else on_get( request, response );
		} );

		server.listen( config.port, config.host );
		console.log( 'Server created on port: ' + config.port + '. Process id: ' + process.pid );
	},


	restart_server: function (){
		console.log( '####################' );
		console.log( 'Restarting server...' );
		console.log( '####################' );

		server.close();
		start_server();
	}

}



var on_get = function( request, response ){
	var url = request.url.split( '?' );
	url = url[0];

	// GET REQUEST
	for( i in dictionary ){
		module = dictionary[i];
		util.inspect( module );

		for( j in module.paths ){
			if( module.paths[j] == url ){
				module.get( request, response );
			}
		}
	}
};



var on_post = function( request, response ){
	var
		url = request.url.split( '?' )
	;

	url = url[0];

	// POST RECEIVED
	var post_data = {};

	request.addListener( 'data', function( chunk ){
		post_data = querystring.parse( unescape( chunk ) );
		util.log( 'Received POST to :' + url + ' targeting: ' + post_data.target  );
	} );

	request.addListener( 'end', function(){
		for( i in dictionary ){
			module = dictionary[i];
			for( j in module.paths ){
				if( module.paths[j] == '/' + post_data.target ){
					util.log( 'Module path match found: ' + post_data.target );
					module.post( post_data, request, response );
				}
			}
		}
	} );
};
