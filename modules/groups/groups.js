var
	db        = require( '../../db/db' ),
	util      = require( 'util' ),
	ejs       = require( 'ejs' ),
	fs        = require( 'fs' ),
	group     = require( './model/group' ),
	group_list = []
;


group_list = group.fetch_list();


module.exports = {

	paths: group_list,

	get: function( request, response ){
		var url = request.url.split( '?' );
		var group_name = url[0].split( '/' );
		group_name = group_name[1];

		group.fetch_messages(
			group_name,
			function( messages ){
				console.log( 'Sending group message list to browser.' );

				response.writeHead( 200, { 'Content-Type': 'text/html' } );

				for( i in messages ){
					util.inspect( messages[i] );
					response.write( messages[i] );
				}

				response.end();
			}
		);
	},


	post: function( post_data, request, response ){
		response.writeHead( 200, { 'Content-Type': 'text/html' } );

		var msg = message.send( {
			template:'view/group-message.ejs',
			plain:    post_data.message,
			sender:  '@brett', // TODO: dynamic sender
			target:   post_data.target
		} );

		response.write( JSON.stringify( msg ) );
		response.end();
	}

};
