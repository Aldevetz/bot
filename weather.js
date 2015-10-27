var https = require('https');
var querystring = require('querystring');
var parseString = require('xml2js').parseString;
var request = require('request');

url = 'http://www.drk7.jp/weather/xml/13.xml';

request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        parseString(body, function (err, result) {

            var message = "みなさんおはようございます。Aldevetz天気予報です\n" + result.weatherforecast.pref[0].area[3].info[0]['$'].date + "\n" +
                result.weatherforecast.pref[0].area[3].info[0].weather[0] + "\n" + result.weatherforecast.pref[0].area[3].info[0].weather_detail[0];

            var options = {
                hostname: 'typetalk.in',
                path: '',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            var req = https.request(options, function (res) {
                console.log('STATUS: ' + res.statusCode);
                res.on('data', function (chunk) {
                    console.log('BODY: ' + chunk);
                });
            });
            req.write(querystring.stringify({'message': message}));
            req.end();
        });
    } else {
        console.log(response);
    }

});




