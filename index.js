var axios = require('axios');
function getTopStreams(num = 5) {
    const topStreamsURL = 'https://api.twitch.tv/helix/streams?first=' + num;
    axios.get(topStreamsURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
        .then(data => console.log(data.data))
        .catch(err => console.log(err));
}

function getTopGames(num = 5) {
    const topGamesURL = 'https://api.twitch.tv/helix/games/top?first=' + num;
    axios.get(topGamesURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
        .then(data => console.log(data.data))
        .catch(err => console.log(err));
}

getTopStreams(3);
getTopGames(1);