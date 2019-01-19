var request = require('request');

var headers = {
    'Client-ID': '76cpa8o345vq4w52p2s4utyzoxsfd5'
};

var options = {
    url: 'https://api.twitch.tv/helix/streams?user_login=forsen',
    headers: headers
};

var data = {};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var tempData = JSON.stringify(JSON.parse(body).data);
        data = JSON.parse(tempData.substring(1, tempData.length-1));
    }
}

request(options, callback);