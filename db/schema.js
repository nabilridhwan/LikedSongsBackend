let mongoose = require('mongoose')
let Schema = mongoose.Schema

exports.User = mongoose.model('user', new Schema({
    name: String,
    slug: String,
    image: String,
    last_updated: String,
    spotifyCountry: String,
    refresh_token: String,
    access_token: String,
    liked_songs: Array,
    product: String,
    href: String
}))