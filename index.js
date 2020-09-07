//include required modules
const jwt = require('jsonwebtoken');
const config = require('./config');
const rp = require('request-promise');
const express = require('express');
const { post } = require('request-promise');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
var email, resp;
const port = 3000;
var emailId = config.email;
//Use the ApiKey and APISecret from config.js
var payload = {
    iss: 'config.APIKey',
    exp: ((new Date()).getTime() + 5000)
};
var token = jwt.sign(payload,'config.APISecret');

let userName = '';


//get the form 
app.get('/', (req, res) => res.send(req.body));

app.post('/v1/userinfo', (req, res) => {
    console.log("req", req);
    payload.iss = req.body.APIKey
    payload.exp = ((new Date()).getTime() + 5000)
    token = jwt.sign(payload, req.body.APISecret);
    // console.log("payload",payload);
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
        //You can use a different uri if you're making an API call to a different Zoom endpoint.
        uri: "https://api.zoom.us/v2/users/" + req.body.email,
        qs: {
            status: 'active'
        },
        auth: {
            'bearer': token
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true //Parse the JSON string in the response
    };

    //Use request-promise module's .then() method to make request calls.
    rp(options)
        .then(function (response) {
            //printing the response on the console
            console.log('User has', response);
            userName = response.id;
            resp = response
            res.send(response);

        })
        .catch(function (err) {
            // API call failed...
            console.log('API call failed, reason ', err);
        });


});

app.post('/v1/getMeeting', (req, res) => {
    
    console.log("req", req);
    payload.iss = req.body.APIKey
    payload.exp = ((new Date()).getTime() + 5000)
    token = jwt.sign(payload, req.body.APISecret);
    var meetingId = req.body.meetingId;
    // console.log("payload",payload);
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
        //You can use a different uri if you're making an API call to a different Zoom endpoint.
        uri: "https://api.zoom.us/v2/meetings/" + meetingId,
        qs: {
            status: 'active'
        },
        auth: {
            'bearer': token
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true //Parse the JSON string in the response
    };

    //Use request-promise module's .then() method to make request calls.
    rp(options)
        .then(function (response) {
            //printing the response on the console
            console.log('User has', response);
            userName = response.id;
            resp = response
            res.send(response);

        })
        .catch(function (err) {
            // API call failed...
            console.log('API call failed, reason ', err);
        });


});

//use userinfo from the form and make a post request to /userinfo
app.get('/userinfo', (req, res) => {
    //store the email address of the user in the email variable
    email = req.body.email;
    //check if the email was stored in the console
    console.log(email);
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
        //You can use a different uri if you're making an API call to a different Zoom endpoint.
        uri: "https://api.zoom.us/v2/users/" + emailId,
        qs: {
            status: 'active'
        },
        auth: {
            'bearer': token
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true //Parse the JSON string in the response
    };

    //Use request-promise module's .then() method to make request calls.
    rp(options)
        .then(function (response) {
            //printing the response on the console
            console.log('User has', response);
            userName = response.id;
            //console.log(typeof response);
            resp = response
            //Adding html to the page
            var title1 = '<center><h3>Your token: </h3></center>'
            var result1 = title1 + '<code><pre style="background-color:#aef8f9;">' + token + '</pre></code>';
            var title = '<center><h3>User\'s information:</h3></center>'
            //Prettify the JSON format using pre tag and JSON.stringify
            var result = title + '<code><pre style="background-color:#aef8f9;">' + JSON.stringify(resp, null, 2) + '</pre></code>'
            res.send(result1 + '<br>' + result);

        })
        .catch(function (err) {
            // API call failed...
            console.log('API call failed, reason ', err);
        });


});

//use userinfo from the form and make a post request to /userinfo
app.post('/v1/listMeeting', (req, res) => {
    console.log("req", req);
    payload.iss = req.body.APIKey
    payload.exp = ((new Date()).getTime() + 5000)
    token = jwt.sign(payload, req.body.APISecret);
    email = req.body.email;
    //check if the email was stored in the console
    console.log(email);
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
        //You can use a different uri if you're making an API call to a different Zoom endpoint.
        uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
        qs: {
            status: 'active'
        },
        auth: {
            'bearer': token
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true //Parse the JSON string in the response
    };

    //Use request-promise module's .then() method to make request calls.
    rp(options)
        .then(function (response) {
            //printing the response on the console
            console.log('User has', response);
            //console.log(typeof response);
            resp = response;
            res.send(response);

        })
        .catch(function (err) {
            // API call failed...
            console.log('API call failed, reason ', err);
        });


});

//use userinfo from the form and make a post request to /userinfo
app.post('/v1/createMeeting', (req, res) => {
    console.log("req", req);
    payload.iss = req.body.APIKey
    payload.exp = ((new Date()).getTime() + 5000)
    token = jwt.sign(payload, req.body.APISecret);
    email = req.body.email;
    var topic = req.body.topic;
    var type = req.body.type;
    
    //check if the email was stored in the console
    console.log(email);
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
        //You can use a different uri if you're making an API call to a different Zoom endpoint.
        
        method: 'POST',
        uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
        qs: {
            status: 'active'
        },
        body:{
            topic: topic,
            type: type,
            "settings": {
                waiting_room : false
            }
        },
        auth: {
            'bearer': token
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true //Parse the JSON string in the response
    };

    //Use request-promise module's .then() method to make request calls.
    rp(options)
        .then(function (response) {
            //printing the response on the console
            console.log('User has', response);
            //console.log(typeof response);
            resp = response;
            res.send(response);

        })
        .catch(function (err) {
            // API call failed...
            console.log('API call failed, reason ', err);
        });


});

//use deleteMeeting from the Rest Client and make a post request to /deleteMeeting
app.post('/v1/deleteMeeting', (req, res) => {
    payload.iss = req.body.APIKey
    payload.exp = ((new Date()).getTime() + 5000)
    token = jwt.sign(payload, req.body.APISecret);
    meetingId = req.body.meetingId;
    console.log("req", meetingId);
    
    //check if the email was stored in the console
    console.log(email);
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
        //You can use a different uri if you're making an API call to a different Zoom endpoint.
        
        method: 'DELETE',
        uri: "https://api.zoom.us/v2/meetings/" + meetingId,
        qs: {
            status: 'active'
        },
        auth: {
            'bearer': token
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true //Parse the JSON string in the response
    };

    //Use request-promise module's .then() method to make request calls.
    rp(options)
        .then(function (response) {
            res.send(JSON.stringify({status : 'deleted'}));

        })
        .catch(function (err) {
            // API call failed...
            console.log('API call failed, reason ', err);
        });


});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));