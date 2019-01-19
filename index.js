var axios = require('axios');
function getTopStreams(num = 5) {
    const topStreamsURL = 'https://api.twitch.tv/helix/streams?first=' + num;
    axios.get(topStreamsURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
}

function getTopGameStreams(gameName, num = 5) {
    const gameURL = 'https://api.twitch.tv/helix/games?name=' + gameName;
    axios.get(gameURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
        .then(res => {
            console.log(res.data);
            const gameID = res.data.data[0].id;
            const topGameStreamsURL = 'https://api.twitch.tv/helix/streams?first=' + num + '&game_id=' + gameID;
            axios.get(topGameStreamsURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
                .then(res => console.log(res.data))
                .catch(err => console.log(err));
        })
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

getTopGameStreams('fortnite');

getStreamInfo('Ninja');
/*
getTopStreams(3);
getTopGames(1);
*/