var Twitter = require('twitter');
var https = require('https');
var request = require('request');
var querystring = require('querystring');

var search_query = '';

var client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

client.get('search/tweets', { q: search_query }, function(error, tweets, response){
    if (!error) {

        var message = '';
        tweets.statuses.forEach(function (val, index, ar) {
            var url = 'https://twitter.com/' + val.user.screen_name + '/status/' + val.id_str;
            message += url + "\n";
        });

        var options = {
            hostname: 'typetalk.in',
            path: '',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        var req = https.request(options, function (res) {
            res.on('data', function (chunk) {
            });
        });

        req.write(querystring.stringify({'message': message}));
        req.end();
    }
});


