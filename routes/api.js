let apiHelper = require('../helpers/api')
let fetch = require('node-fetch')
let schemas = require('../db/schema')
const {
    Mongoose
} = require('mongoose')

require('dotenv').config()

// Get from env file
let {
    CLIENT_ID,
    CLIENT_SECRET,
    HOST,
    FRONTEND_HOST
} = process.env;

exports.home = (req, res) => {
    apiHelper.readResponse(req, res, null, null);
}

exports.getRedirectLink = (req, res) => {
    let clientId = "479587da55f94b029cc5a1590243fdc8";
    let redirectUri = `${HOST}/api/callback`;
    let scopes = "user-library-read,user-read-email,user-read-private";
    let data = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`
    apiHelper.readResponse(req, res, null, data)
}

exports.callback = (req, res) => {
    let {
        code
    } = req.query;

    // Request data
    let base64 = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
        redirect_uri = `${HOST}/api/callback`;
    let properReqBody = `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`

    fetch(`https://accounts.spotify.com/api/token?`, {
            method: "POST",
            body: properReqBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': properReqBody.length,
                'Authorization': `Basic ${base64}`
            }
        })
        .then(response => response.json())
        .then(json => {
            let {
                refresh_token
            } = json;
            res.redirect(`/api/getAccessTokenFromRefreshToken?refresh_token=${refresh_token}`)

        })
}

exports.getAccessTokenFromRefreshToken = (req, res) => {
    let {
        refresh_token
    } = req.query;
    // TODO: Error handling if no refresh token

    let base64 = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    let properReqBody = `grant_type=refresh_token&refresh_token=${refresh_token}`

    fetch(`https://accounts.spotify.com/api/token?`, {
            method: "POST",
            body: properReqBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': properReqBody.length,
                'Authorization': `Basic ${base64}`
            }
        })
        .then(response => response.json())
        .then(json => {

            // Use current access token to update user profile
            let {
                access_token
            } = json;
            res.redirect(`/api/updateUser?access_token=${access_token}&refresh_token${refresh_token}`)
        })
}

exports.updateUser = (req, res) => {
    let {
        access_token,
        refresh_token
    } = req.query
    // Get username, slug of user
    fetch('https://api.spotify.com/v1/me', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(res => res.json())
        .then(json => {
            let {
                country,
                display_name,
                id,
                product,
                images,
                external_urls
            } = json;
            
            console.log(json)

            // Get list of liked songs
            fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    },
                }).then(res => res.json())
                .then(json => {
                    // Save to DB
                    // Check if user exists
                    schemas.User.find({
                        slug: id
                    }, (err, docs) => {

                        let endSaveObject = {
                            name: display_name,
                            slug: id,
                            image: images[0].url,
                            last_updated: new Date().toISOString(),
                            spotifyCountry: country,
                            refresh_token: refresh_token,
                            access_token: access_token,
                            liked_songs: json.items,
                            product: product,
                            href: external_urls.spotify
                        }

                        // If exists: Update user profile
                        if (docs.length) {
                            console.log("User Found - Updating User's Data")
                            schemas.User.findOneAndUpdate({
                                slug: id
                            }, endSaveObject).then(docs => console.log("Updated!"))
                        } else {
                            // If does not exist: Sign them up (save)
                            console.log("New User - Saving New Data")
                            schemas.User(endSaveObject).save()
                        }

                        req.session.slug = id;
                        req.session.profile_picture_src = images[0].url;
                        // Redirect to profile page
                        res.redirect(`/search`)
                    })
                })
        })
}

exports.getProfiles = (req, res) => {
    let {
        slug
    } = req.query;

    console.log(req.query)

    if (!slug) {
        console.log("Finding all")
        schemas.User.find({}, (err, users) => {
            if (err) {
                apiHelper.readResponse(req, res, true, err)
            }

            apiHelper.readResponse(req, res, null, users)
        })
    } else {
        console.log(`Finding ${slug}`)
        schemas.User.findOne({
            slug: slug
        }, (err, users) => {
            if (err) {
                apiHelper.readResponse(req, res, true, err)
            }
            apiHelper.readResponse(req, res, null, users)
        })
    }
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/")
}