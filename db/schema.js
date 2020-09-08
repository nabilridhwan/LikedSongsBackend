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
    product: String,
    href: String
}))

exports.LikedSongs = mongoose.model('liked_songs', new Schema({
    _id: String, // User's slug
    songs: Array // Users' liked songs list
}))