var
	util     = require( 'util' ),
	config   = require( '../config' ),
	mysql    = require('mysql'),
	Client   = mysql.Client,
	table    = config.database.table.messages,
	client   = new Client( {
		user:     config.database.user,
		password: config.database.password,
		database: 'atrium'
	} )
;


module.exports = {

	query: function( query, args, callback ){
		args = args || [];
		client.connect();
		var result = client.query( query, args, callback );
		client.end();
		return result;
	}

};
