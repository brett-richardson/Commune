var db = require( '../../../db/db' );

var Group = function( group_name ){

	this.group_name = group_name;


	var on_fetched_messages = function( messages, callback ){
		// console.log( 'User object received messages from DB' );
		callback( messages );
		this.messages = messages;
	};


	this.fetch_messages = function( user, callback ){
		//console.log( 'Fetchting messages for user: ' + this.login );
		var messages = [];

		db.query(
			"SELECT * FROM messages WHERE target = ? OR sender = ? "+
			"ORDER BY time DESC LIMIT 10",
			[ this.group_name, user.login ],
			function( error, results, fields ){
				for( i in results ){
					// console.log( 'Got HTML message: ' + results[i].msg_html );
					messages.push( results[i].msg_html );
				}
				on_fetched_messages( messages.reverse(), callback );
			}
		);
	};

}



module.exports = {

	fetch_messages: function( group_name, callback ){
		var g = new Group( group_name );
		g.fetch_messages( callback );
	},

	fetch_list: function(){
		var list = [];

		db.query(
			'SELECT name FROM groups', [],
			function( error, results, fields ){
				for( i in results ){
					row = results[i];
					list.push( '/#' + row.name );
				}
			}
		);

		return list;
	}

};
