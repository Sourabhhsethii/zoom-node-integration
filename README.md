# Make Zoom API call using JWT Using Node JS

> With this NodeJS Application, you can learn how to generate JWT and use the JWT to authenticate and make a Zoom API call. Follow the steps below to install the Application and run it on your computer. 

# Getting Started

## API Usage Details for zoom-node-integration application. 

### API userinfo.
http://localhost:3000/v1/userinfo
	
    POST Param

   		"APIKey":"iHUCbf7HSPumwF2Dyj1eGA1234"
   		"email":"sourabhsethi8888@gmail.com"
   		"APISecret":"1234nQFgryGS0lWmOqo6MTTQSIxH0DvBnsSPvrTO"

### API listMeeting.
http://localhost:3000/v1/listMeeting
	
    POST Param

   		 "APIKey":"iHUCbf7HSPumwF2Dyj1eGA1234"
  		 "email":"sourabhsethi8888@gmail.com"
   		 "APISecret":"1234nQFgryGS0lWmOqo6MTTQSIxH0DvBnsSPvrTO"

### API createMeeting.
http://localhost:3000/v1/createMeeting
	
    POST Param
		
        APIKey:"iHUCbf7HSPumwF2Dyj1eGA1234"
  		email:"sourabhsethi8888@gmail.com"
   		APISecret:"1234nQFgryGS0lWmOqo6MTTQSIxH0DvBnsSPvrTO"
		topic : "Test Portal Integration"
		type : 2 (Integer)

### API deleteMeeting.
http://localhost:3000/v1/deleteMeeting
	
    POST Param
		
        APIKey:"iHUCbf7HSPumwF2Dyj1eGA1234"
   		APISecret:"1234nQFgryGS0lWmOqo6MTTQSIxH0DvBnsSPvrTO"
		meetingId: 1234567 (Integer)

### API getMeeting.
http://localhost:3000/v1/getMeeting
	
    POST Param
		
        APIKey:"iHUCbf7HSPumwF2Dyj1eGA1234"
   		APISecret:"1234nQFgryGS0lWmOqo6MTTQSIxH0DvBnsSPvrTO"
		meetingId: 1234567 (Integer)

### Install

Clone the repo using git clone.
` https://github.com/Sourabhhsethii/zoom-node-integration.git`

> Install the dependent node modules.

 The app requires the following modules:

 >jsonwebtoken : Provides a way to generate JWT with jwt.sign() method. 
 >request-promise: Provides a way to Request call objects with .then() method.
 >express: Web application framework for Node.js.

To install these dependencies in your project directory, type `npm-install <module-name>` in your terminal.

### Quick Start

To generate JWT, you have to provide your API Key and API Secret credentials. You can locate these credentials in your app’s configuration by going to Zoom Marketplace > Manage > <YourApp> > App Credentials. If you haven’t already registered your app in the marketplace, you will have to create an app here to get your credentials. For the purpose of this sample app, you only need your credentials and you do not have to fill out any additional information while registering the app.

> In the config.js file, input your client API Key & Secret credentials.
``` 
	const config = {
	production:{	
		APIKey : 'Your environment API Key',
		APISecret : 'Your environment API Secret'
	}
    };
```
> Set your environment varaibles.
` export NODE_NEV=[environment name] (e.g. export NODE_NEV=production) `

> Start the node app.
Type `node index.js` in your terminal from within the project directory.

> Enter your email and view the API's response.
 When you run the app, you will see a form that asks for an email address. Provide your Zoom email address and you will see your JWT and other information related to your account. 

The following code snippet generates the JWT using your Client Credentials:
``` 
    const payload = {
    iss: config.APIKey,
    exp: ((new Date()).getTime() + 5000)
};
	const token = jwt.sign(payload, config.APISecret);
```
localhost:3000/v1/userinfo:  it will post the entered information and the email will be used to make a **Retrieve User** Zoom API call that displays the API response - information related to the user. This is achieved through an HTTP POST method. You can make API calls to other ZOOM endpoints by replacing the uri shown in the snippet below with another uri of your choice. You can find more about ZOOM APIs here. 

 ```
    var options = {
    uri: "https://api.zoom.us/v2/users/"+email, 
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
```

### API Avaliable

Documentation for JWT is available [here](https://marketplace.zoom.us/docs/guides/authorization/jwt). You can learn more about Zoom API [here](https://marketplace.zoom.us/docs/api-reference/introduction).



 
## Support

For any questions or issues, please visit our new Community Support Forum at https://devforum.zoom.us/







