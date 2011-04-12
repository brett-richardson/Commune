document.commune = new function(){
	var
		interval,
		dictionary = []
	;

	init();

	// PUBLIC AREA ################################################

	this.on_timer = function(){
		checkin();
	};

	this.set_dictionary = function( dict ){
		dictionary = dict;
		$( document ).ready( function(){
			setup_autocomplete( dict );
		} );
	};


	// PRIVATE AREA ################################################

	function init(){
		interval = setInterval( 'document.commune.on_timer()', 5000 ); // Set timer for check-in
		this.dictionary = [];

		$( document ).ready( function(){
			$('#post-form').submit( submit_message ); // Set up ajax submission & behaviour
			$('#post-form').keypress( on_keypress ); // Set up key listeners
			checkin();
		} );
	}


	function checkin(){
		$.ajax( {
			url:    '/@brett', // TODO: Dynamically get logged in user name
			cache:   false,
			error:   on_error,
			success: on_success
		} );
	}


	function on_success( data ){
		//console.log( 'INT Received data: ' + data );
		$( '#message-window' ).html( data );
		$( '#message-window' ).scrollTo( 'max', 1 );
	}


	function on_error( request, error, except ){
		console.log( 'error! ' + error );
	}


	function submit_message(){
		$.post( "/",
			$( "#post-form" ).serialize(),
			function( data ){
				console.log( "RETURNED:" + data );
			}
		);
		$( "#post-form #message" ).val( '' ).focus();
		checkin();
		return false;
	}


	function on_keypress( event ){
		console.log( event.which );
		console.dir( event );

		if( event.which == '10' && event.ctrlKey ){
			event.preventDefault();
			submit_message();
		}
	}


	function setup_autocomplete( dict ){
		$( "#post-form #target" ).autocomplete( dict, {
			autoFill: true,
			delay: 0,
			matchContains: true,
			multiple: false,
			mustMatch: true
		} );
	}
};
