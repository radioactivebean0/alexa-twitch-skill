var axios = require('axios');
function getTopStreams(num = 5) {
    const topStreamsURL = 'https://api.twitch.tv/helix/streams?first=' + num;
    axios.get(topStreamsURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
}

function getTopGameStreams(gameID, num = 5) {
    const topGameStreamsURL = 'https://api.twitch.tv/helix/streams?first=' + num + '&game_id=' + gameID;
    axios.get(topGameStreamsURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
}


function getTopGames(num = 5) {
    const topGamesURL = 'https://api.twitch.tv/helix/games/top?first=' + num;
    axios.get(topGamesURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
}

function getStreamInfo(userLogin) {
    const streamURL = 'https://api.twitch.tv/helix/streams?user_login=' + userLogin;
    axios.get(streamURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
}

getTopGameStreams(33214);
/*
getStreamInfo('ninja');
getTopStreams(3);
getTopGames(1);
*/