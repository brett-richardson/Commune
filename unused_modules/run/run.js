var
	db    = require( '../../db/db' ),
	util  = require( 'util' )
;

module.exports = {

	paths: [ '/run' ],

	get: function( request, response ){},

	post: function( post_data, request, response ){
		var
			input   = post_data.message.split( ' ' ),
			command = input.shift(),
			spawn   = require('child_process').spawn( command, input )
		;

		util.log( 'RUNNING COMMAND: ' + command );

		spawn.stdout.on( 'data', function( data ){
			util.log( 'RUN:' + data );
			db.send_message( '' + data, '@brett', 'run' );
		} );

		spawn.stderr.on( 'data', function( data ){
			util.log( '!!! RUN:' + data );
			db.send_message( 'ERROR: ' + data, '@brett', 'run' );
		} );
	}

};
