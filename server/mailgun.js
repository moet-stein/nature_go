var api_key = 'XXXXXXXXXXXXXXXXXXXXXXX';
var domain = 'www.mydomain.com';
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'serobnic@mail.ru',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!',
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
