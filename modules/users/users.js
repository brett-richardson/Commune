var
	db        = require( '../../db/db' ),
	util      = require( 'util' ),
	ejs       = require( 'ejs' ),
	fs        = require( 'fs' ),
	user      = require( './model/user' ),
	message   = require( './model/message' ),
	user_list = []
;


user_list = user.fetch_list();


module.exports = {

	paths: user_list,

	get: function( request, response ){
		var url = request.url.split( '?' );

		user_name = url[0].split( '/' );
		user_name = user_name[1];

		var u = user.login( user_name, 'password' ); // TODO: real password

		u.fetch_messages( function( messages ){
			console.log( 'Sending user message list to browser.' );

			response.writeHead( 200, { 'Content-Type': 'text/html' } );

			for( i in messages ){
				util.inspect( messages[i] );
				response.write( messages[i] );
			}

			response.end();
		} );
	},

	post: function( post_data, request, response ){
		response.writeHead( 200, { 'Content-Type': 'text/html' } );

		var msg = message.send( {
			template:'view/user-message.ejs',
			plain:    post_data.message,
			sender:  '@brett', // TODO: dynamic sender
			target:   post_data.target
		} );

		response.write( JSON.stringify( msg ) );
		response.end();
	}

};
