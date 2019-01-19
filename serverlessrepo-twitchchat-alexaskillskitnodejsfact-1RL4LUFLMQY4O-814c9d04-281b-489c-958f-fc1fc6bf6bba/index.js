/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('alexa-sdk');

const GetTwitchStreamHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'twitchchat');
  },
  handle(handlerInput) {
    if(this.event.request.intent.slots.streamers.value==null){
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
      
    getData(this.event.request.intent.slots.streamers.value);
    let streamname = getStreamName();
    let viewers = getViewers();
    
    const speechOutput = this.event.request.intent.slots.streamers.value +"'s stream titled:"
                  streamname +"has" +viewers +"viewers.";
    
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(streamname, viewers)
      .getResponse();
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

let stream_name;
let viewers;
let datastring;
function getData(name){
  if(name==null){
    
  }
  
  var request = require('request');

  var headers = {
     'Client-ID': '76cpa8o345vq4w52p2d5'
  };

  var options = {
     url: 'https://api.twitch.tv/helix/streams?user_login='+name,
     headers: headers
  };
  var body;
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
  }

  request(options, callback);
  body = request;

}
function getTopTen(){
  return;
}
function getStreamName(){
  
  return datastring.data.title;
}
function getViewers(){
  return datastring.data.viewer_count;
}