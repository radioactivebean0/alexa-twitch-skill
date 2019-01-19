var axios = require('axios');

const URL = 'https://api.twitch.tv/helix/games/top?first=5';

axios.get(URL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
    .then(data => console.log(data.data))
    .catch(err => console.log(err));
/*
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
        data = JSON.parse(body).data[0];
    }
}

request(options, callback);
*/