var
	loader      = require( './loader' ),
	commune     = require( './commune' ),
	dictionary
;


loader.process_module_dir(
	'./modules/',                                      // PATH TO PROCESS
	function( dict ){ commune.start_server( dict ); }, // CALLBACK TO START SERVER;
	commune.restart_server                             // CALLBACK ON MODULE FILE CHANGE ( not working )
);
