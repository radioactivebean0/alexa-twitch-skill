var request = require('request');

var headers = {
    'Client-ID': '76cpa8o345vq4w52p2s4utyzoxsfd5'
};

var options = {
    url: 'https://api.twitch.tv/helix/streams?user_login=forsen',
    headers: headers
};

var bleh = {};
var data = {};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body);
        bleh = JSON.parse(body);
        console.log(bleh["data"]);
    }
}

request(options, callback);
