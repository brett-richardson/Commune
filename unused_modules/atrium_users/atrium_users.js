var
	atrium_db = require( '../../db/atrium' ),
	util      = require( 'util' ),
	db        = require( '../../db/db' )
;


module.exports = {

	paths: get_users(),

	get: function( request, response ){},

	post: function( post_data, request, response ){
		response.writeHead( 200, { 'Content-Type': 'text/html' } );
		db.send_message(
			post_data.message,
			post_data.target,
			'@brett'
		);
		response.write( "{success:'true'}" );
		response.end();
	}

};


function get_users(){
	var users = [];

	atrium_db.query( "SELECT name FROM users", function( error, results, fields ){
		for( i in results ){
			user = results[i];
			users.push( '/@' + user.name );
		}
	} );

	return users;
}
