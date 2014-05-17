var moment = require('moment'),
	logger = require('./logger'),
	$ = require('jquery'),
	$body = $('body'),
	$foo = $('#foo');

$body.css('background-color', 'red');

$foo
	.append('Today is: ' + moment().format('dddd'))
	.css('color', 'white');

logger.log('Hello World!');
