// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
function sendMsgToCustomer(phoneNumber, name) {
    const accountSid = 'ACf097d5307205dd9a57431455f5a8fbd0'; // Your Account SID from www.twilio.com/console
    const authToken = 'f3068db2f4f54b23ca07063b11b3e979'; // Your Auth Token from www.twilio.com/console

    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages
        .create({
            body: 'Dear , Your order has been placed successfully!',
            to: '+6583322005', // Text this number
            from: '+17579928401', // From a valid Twilio number
        })
        .then((message) => console.log(message.sid));

}

const accountSid = 'ACf097d5307205dd9a57431455f5a8fbd0'; // Your Account SID from www.twilio.com/console
const authToken = 'f3068db2f4f54b23ca07063b11b3e979'; // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

client.messages
    .create({
        body: 'Hello from Node',
        to: '+6583322005', // Text this number
        from: '+17579928401', // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));

