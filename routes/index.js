const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function(req, res, next) {
  res.redirect('index.html');
});

router.post('/register', function(req, res, next) {
    const url = process.env['api-uri'];
    const apiKey = process.env['api-key'];
    const applicationName = process.env['application_Name'];
    const applicationUUID = process.env['application_UUID'];

    if(!url || !apiKey || !applicationName || !applicationUUID) {
        console.error('env params are missing', url, apiKey, applicationName, applicationUUID);
        res.redirect('error.html');
        return;
    }

    let body = {
        name: req.body.name,
        email: req.body.email,
        application: {
            name: applicationName,
            uuid: applicationUUID
        }
    };
    
    let options = {
        url: url,
        method: 'POST',
        json: true,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        }
    };

    console.info(options);
    request(options, function(err, response, body) {
        if(err ||response.statusCode != 200) {
            console.error(err);
            console.log('status code', response.statusCode);
            res.redirect('error.html');
        } else {
            res.redirect('success.html');
        }
    });
});

module.exports = router;
