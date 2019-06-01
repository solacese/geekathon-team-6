const AWS = require('aws-sdk');
const request = require("request");
exports.handler = (event, context, callback) => {
    
    AWS.config.update({region: 'us-east-1'});
    
    const response = {
        statusCode: 200,
        body: JSON.stringify("ok")
    };
    var reqMsg = JSON.parse(event.body);

    var rekognition = new AWS.Rekognition();
    var params = {
      Image: {
       S3Object: {
        Bucket: "geekfestteam6", 
        Name: reqMsg.s3file
       }
      }, 
      MaxLabels: 123, 
      MinConfidence: 70
     };
    var awsRequest = rekognition.detectLabels(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else {
        data.id = reqMsg.id;
        data.lat = reqMsg.lat;
        data.lon = reqMsg.lon;
        data.s3file = reqMsg.s3file;
        
        delete params.MaxLabels;
        delete params.MinConfidence;
        var awsTextRequest = rekognition.detectText(params, function (err, textData) {
          if (err) console.log(err, err.stack); // an error occurred
          else {
            console.log("here -> " + JSON.stringify(textData));           // successful response
            data.TextDetected = textData.TextDetections;
            console.log("there -> " + JSON.stringify(data));
            var s3 = new AWS.S3();
            s3.getObject({
              Bucket: "geekfestteam6", 
              Key: reqMsg.s3file
            }, (s3Err, objData) => {
              data.fileType = objData.ContentType;
              data.fileContent = objData.Body.toString('base64');
              publishMsg(JSON.stringify(data), "hq/" + reqMsg.id + "/recognized");
              callback(null, response);
            });
          }
        });
        
      }
    });
    
};

function publishMsg(msgText, destination) {
 
  request({
    method: "POST",
    uri: "http://mrq8m7h73wwf7.messaging.solace.cloud:9000/TOPIC/" + destination,
    body: msgText,
    contentType: 'text',
    headers: {
        "Solace-delivery-mode": "persistent"
    },
    auth: {
      username: "solace-cloud-client",
      password: "7jogtdlnkooikpnldenel5r7tf"
    },
    time: false
  }, (error, res, body) => {
    if (error != null || res.statusCode > 299 || res.statusCode < 200) {
      console.log(`Failed to send the message to Solace!
      Status Code: ${res ? res.statusCode : ""}
      Status Message: ${res ? res.statusMessage : ""}
      ${error ? error: ""}`);
      
      return false;
    }
  })

  return true;
}

