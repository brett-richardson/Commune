vows.describe( "Config file" ).addBatch( {
	"The config module": {
		topic: require( '../config' ),
		'has a port defined': function(){
			assert.isNumber( topic.port );
		},
		'has a host defined': function(){
			assert.isString( topic.host );
		}
	}
} );
