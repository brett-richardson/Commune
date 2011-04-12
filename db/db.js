var
	util     = require( 'util' ),
	config   = require( '../config' ),
	mysql    = require('mysql'),
	Client   = mysql.Client,
	table    = config.database.table.messages,
	client   = new Client( {
		user:     config.database.user,
		password: config.database.password,
		database: config.database.name
	} )
;


module.exports = {

	send_message: function( message, message_html, target, sender ){
		target = target || '*';
		sender = sender || 'Anonymous';

		client.connect();
		client.query(
			'INSERT INTO ' + table + ' ' +
			'SET target = ?, msg_plain = ?, msg_html = ?, sender = ?',
			[ target, message, message_html, sender ]
		);
		client.end();
	},

	query: function( query, args, callback ){
		args = args || [];
		client.connect();
		var result = client.query( query, args, callback );
		client.end();
		return result;
	}

};
