'use strict';

const Alexa = require('alexa-sdk');
var $twine = null;

module.exports.handler = (event, context, callback) => {
  console.log(`handler: ${JSON.stringify(event.request)}`);



  // prepare alexa-sdk
  const alexa = Alexa.handler(event, context);
  // APP_ID is your skill id which can be found in the Amazon developer console
  // where you create the skill. Optionally set as a Lamba environment variable.
  alexa.appId = process.env.APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function() {
    console.log(`LaunchRequest`);
    if(this.event.request.intent.slots.streamers.value==null){
       this.emit('NoStreamer');
    }
    else{
        this.emit('twitchchat');
  },
  'twitchchat' : function(){
        getData(this.event.request.intent.slots.streamers.value);
        let streamname = getStreamName();
        let viewers = getViewers();
    
        const speechOutput = this.event.request.intent.slots.streamers.value +"'s stream titled:"+
                  streamname +"has" +viewers +"viewers.";
        
        this.response.speak(speechOutput);
        this.emit(':responseReady');
  },
  
  'AMAZON.HelpIntent': function() {
    var speechOutput = 'This is the Sample Gamebook Skill. ';
    var reprompt = 'Say where am I, to hear me speak.';
    speechOutput = speechOutput + reprompt;
    var cardTitle = 'Help.';
    var cardContent = speechOutput;
    var imageObj = undefined;
    console.log(`HelpIntent: ${JSON.stringify({
      "speak": speechOutput,
      "listen": reprompt,
      "card" : {
        "title": cardTitle,
        "content": cardContent,
        "imageObj": imageObj
      }
    })}`);
    this.response.speak(speechOutput)
      .listen(reprompt)
      .cardRenderer(cardTitle, cardContent, imageObj);
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function() {
    this.emit('CompletelyExit');
  },
  'AMAZON.StopIntent': function() {
    this.emit('CompletelyExit');
  },
  
  'AMAZON.RepeatIntent': function() {
    console.log(`RepeatIntent`);
    this.emit('WhereAmI');
  },
  'Unhandled': function() {
    // handle any intent in interaction model with no handler code
    console.log(`Unhandled`);
    followLink(this.event, this.event.request.intent.name);
    this.emit('WhereAmI');
  },
};


}

//COOKBOOK HELPER FUNCTIONS

function getSlotValues(filledSlots) {
  //given event.request.intent.slots, a slots values object so you have
  //what synonym the person said - .synonym
  //what that resolved to - .resolved
  //and if it's a word that is in your slot values - .isValidated
  let slotValues = {};

  console.log('The filled slots: ' + JSON.stringify(filledSlots));
  Object.keys(filledSlots).forEach(function(item) {
    //console.log("item in filledSlots: "+JSON.stringify(filledSlots[item]));
    var name = filledSlots[item].name;
    //console.log("name: "+name);
    if (filledSlots[item] &&
      filledSlots[item].resolutions &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {

      switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
        case "ER_SUCCESS_MATCH":
          slotValues[name] = {
            "synonym": filledSlots[item].value,
            "resolved": filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            "isValidated": true
          };
          break;
        case "ER_SUCCESS_NO_MATCH":
          slotValues[name] = {
            "synonym": filledSlots[item].value,
            "resolved": filledSlots[item].value,
            "isValidated": false
          };
          break;
      }
    } else {
      slotValues[name] = {
        "synonym": filledSlots[item].value,
        "resolved": filledSlots[item].value,
        "isValidated": false
      };
    }
  }, this);
  //console.log("slot values: " + JSON.stringify(slotValues));
  return slotValues;
}
