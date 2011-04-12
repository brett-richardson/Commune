var
	ejs = require( 'ejs' ),
	fs  = require( 'fs' ),
	db  = require( '../../../db/db' )
;


module.exports = {
	send: function( opts ){
		var msg = new Message( opts );
		msg.send_to_db();
		return msg;
	}
}


var Message = function( opts ){
	this.plain  = opts.plain,
	this.sender = opts.sender,
	this.target = opts.target,
	this.time   = opts.time = new Date();
	this.html   = ejs.render(
		fs.readFileSync( // TODO: async version
			__dirname + '/../' + opts.template, 'utf8'
		),{ locals: opts }
	);

	this.send_to_db = function(){
		db.send_message(
			this.plain,
			this.html,
			this.target,
			this.sender,
			this.time
		)
	}
}
