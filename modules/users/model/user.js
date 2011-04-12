var db = require( '../../../db/db' );

var User = function(){

	this.login = "/@brett";
	this.is_signed_in = false;
	this.messages = [];


	var on_fetched_messages = function( messages, callback ){
		// console.log( 'User object received messages from DB' );
		callback( messages );
		this.messages = messages;
	};


	this.fetch_messages = function( callback ){
		//console.log( 'Fetchting messages for user: ' + this.login );
		var messages = [];

		db.query(
			"SELECT * FROM messages WHERE target = ? OR sender = ? "+
			"ORDER BY time DESC LIMIT 10",
			[ this.login, this.login ],
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

	login: function( login, pass ){
		var u = new User();

		u.login = login;
		u.is_signed_in = true;

		return u;
	},


	fetch_list: function(){
		var list = [];

		db.query(
			'SELECT name FROM users', [],
			function( error, results, fields ){
				for( i in results ){
					row = results[i];
					list.push( '/@' + row.name );
				}
			}
		);

		return list;
	}

};
