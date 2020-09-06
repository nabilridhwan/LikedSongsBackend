let express = require('express')
let app = express();
let cors = require('cors')
let mongoose = require('mongoose')
let session = require('express-session')
let cookieParser = require('cookie-parser');
require('dotenv').config()

let apiRoutes = require('./routes/api')
let routes = require('./routes/index')

let {
    MONGODB_URI,
    PORT
} = process.env;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.set('view engine', 'ejs')


app.use(cors())
app.use(cookieParser())
app.use(session({
    secret: 'S3CR37',
    resave: false,
}))
app.use((req, res, next) => {
    res.locals.ngApp = "mainApp"
    res.locals.appName = "Discoverify"
    res.locals.slug = req.session.slug
    if(req.session.profile_picture_src){
        res.locals.profile_picture_src = req.session.profile_picture_src
    }else{
        res.locals.profile_picture_src = "http://placehold.it/32x32";
    }
    next();
})
app.use(express.static(__dirname + "/static"))

app.get('/', (req, res) => routes.home(req, res))
app.get('/profile', (req, res) => routes.profile(req, res))
app.get("/api/:apiroute", (req, res) => apiRoutes[req.params.apiroute](req, res))

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})