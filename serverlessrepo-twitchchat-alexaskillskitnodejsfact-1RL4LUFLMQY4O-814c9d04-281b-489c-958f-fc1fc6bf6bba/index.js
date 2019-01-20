/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetTwitchStreamHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'twitchchat');
  },
  handle(handlerInput) {
    /*if(handlerInput.requestEnvelope.request.intent.slots.streamers.value==null){
      const speechOutput = "I can tell you info about the top ten streams. Here are the top ten live streamers in order:";
      getData(null);
      const topTen  = getTopTen();
      for(var i=0; i<10; i++){
        speechOutput = speechOutput +"," + topTen[i];
      }
      return handlerInput.responseBuilder
        .speak(speechOutput)
        .getResponse();
    }
    */
    let name = handlerInput.requestEnvelope.request.intent.slots.streamers.value;

    getStreamInfo(name).then(res => {
      let streamname = res.data[0].title;
      let viewers = res.data[0].viewer_count;
      const speechOutput = name + "'s stream titled:"
      streamname + "has" + viewers + "viewers.";

      return handlerInput.responseBuilder
        .speak(speechOutput)
        .withSimpleCard(streamname, viewers)
        .getResponse();

    }).catch(err => console.log(err));


  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

/// TO DO
const HELP_MESSAGE = 'You can ask me about twitch streams, or a particular stream, or to exit... What can I help you with?';
const HELP_REPROMPT = 'You can ask me about twitch streams, or a particular stream, or to exit... What can I help you with?';
const STOP_MESSAGE = 'C. Y. at';



const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetTwitchStreamHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

function getTopStreams(num = 5) {
  const topStreamsURL = 'https://api.twitch.tv/helix/streams?first=' + num;
  return new Promise(function (resolve, reject) {
    axios.get(topStreamsURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
      .then(res => resolve(res.data))
      .catch(err => console.log(err));
  });
}

function getTopGameStreams(gameName, num = 5) {
  const gameURL = 'https://api.twitch.tv/helix/games?name=' + gameName;
  return new Promise(function (resolve, reject) {
    axios.get(gameURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
      .then(res => {
        const gameID = res.data.data[0].id;
        const topGameStreamsURL = 'https://api.twitch.tv/helix/streams?first=' + num + '&game_id=' + gameID;
        axios.get(topGameStreamsURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
          .then(res => resolve(res.data))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
}

function getTopGames(num = 5) {
  const topGamesURL = 'https://api.twitch.tv/helix/games/top?first=' + num;
  return new Promise(function (resolve, reject) {
    axios.get(topGamesURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
      .then(res => resolve(res.data))
      .catch(err => console.log(err));
  });
}


function getStreamInfo(userLogin) {
  const streamURL = 'https://api.twitch.tv/helix/streams?user_login=' + userLogin;
  return new Promise(function (resolve, reject) {
    axios.get(streamURL, { headers: { 'Client-ID': 'n6tkzhwjlttoho9gnpid51z840eiv3' } })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => console.log(err));
  });
}

