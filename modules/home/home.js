var
	config = require( '../../config.js' ),
	ejs    = require( 'ejs' ),
	fs     = require( 'fs' ),
	util   = require( 'util' )
;


module.exports = {

	paths: [ '/' ],

	get: function( request, response ){
		print_page( response );
	},

	post: function( post_data, request, response ){
	}

};


function print_page( response ){
	response.writeHead( 200, { 'Content-Type': 'text/html' } );

	include_scripts( response, [
		'view/jquery.js', 'view/jquery.ajaxify.js', 'view/jquery.autocomplete.js', 'view/jquery.scrollto.js',
		'view/commune-local.js'
	] );

	embed_local_dictionary( response );

	response.write( "<style>" + fs.readFileSync( __dirname + '/view/style.css', 'utf8' ) + "</style>" );
	response.write( // TODO: Replace this with async version
		fs.readFileSync( __dirname + '/view/post-form.ejs', 'utf8' )
	);

	response.end();
}


function embed_local_dictionary( response ){
	response.write(
		"<script>document.commune.set_dictionary(" +
			JSON.stringify(
				require( '../../loader' ).flat_dictionary()
			) +
		");</script>"
	);
}


function include_scripts( response, scripts ){
	for( i in scripts ){
		response.write(
			'<script>' + // TODO: Replace this with async version
				fs.readFileSync( __dirname + '/' + scripts[i], 'utf8' ) +
			'</script>'
		);
	}
}
