/*
 * LOADER.JS
 * Handles the loading of modules and keeps track of the routing directory
 */


var
	fs        = require( 'fs' ),
	util      = require( 'util' ),
	dict      = []
;


module.exports = {

	process_module_dir: function( path, callback, on_file_change ){
		console.log( 'Loading modules from ' + path + ' directory.' );

		fs.readdir( path, function( error, module_dirs ){
			console.log( 'Found modules: ' + module_dirs  );

			for( i in module_dirs ){
				var module_dir     = module_dirs[i];
				var require_string = __dirname + '/' + path + module_dir + '/' + module_dir;

				util.log( 'Adding module: ' + require_string );

				var module = require( require_string );


				dict.push( module );

				// This allows the main.js to auto-restart when modules are updated
				fs.watchFile( require_string, on_file_change );
			}
		} );

		callback( dict );
	},


	dictionary: dict,


	flat_dictionary: function(){
		var flat = [];
		for( i in dict ){
			flat = flat.concat( dict[i].paths );
		}
		for( i in flat ){
			flat[i] = flat[i].replace( '/','' );
		}
		util.log( "!!!" + util.inspect( flat ) );
		return flat;
	}

};
