let responseHelper = require('./responseHelper')
let request = require('request')

exports.home = (req, res) => {
    res.send(responseHelper.BuildResponse(null, null))
}

exports.getRedirectLink = (req, res) => {
    let clientId = "479587da55f94b029cc5a1590243fdc8";
    let redirectUri = "http://localhost:3000/callback";
    let scopes = "user-library-read";
    let data = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`
    res.send(responseHelper.BuildResponse(null, data))
}

exports.callback = (req, res) => {
    let {
        code
    } = req.query;

    // TODO: Change to variables
    let client_id = "479587da55f94b029cc5a1590243fdc8";
    let client_secret = "e8902230ef784a69aa5ccb922e6d31ff";
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: "http://localhost:3000/callback",
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };

    if (req.query.error) res.send(responseHelper.BuildResponse(true, "Denied Request"))

    request.post(authOptions, (err, response, body) => {

        console.log(response.statusCode)
        if (!err && response.statusCode === 200) {
            let access_token = body.access_token,
                refresh_token = body.refresh_token;

                console.log(access_token, refresh_token)
        }
    })
    res.send(req.query)
}