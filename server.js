let express = require('express')
let app = express();
let cors = require('cors')
let mongoose = require('mongoose')
let session = require('express-session')
let MongoStore = require('connect-mongo')(session)
require('dotenv').config()

let apiRoutes = require('./routes/api')
let routes = require('./routes/index')

let {
    MONGODB_URI,
    PORT,
    SESSION_SECRET
} = process.env;

let connection = mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.set('view engine', 'ejs')


app.use(cors())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000, // 1 Hour,
    },
}))
app.use((req, res, next) => {
    res.locals.ngApp = "mainApp"
    res.locals.appName = "Discoverify"
    res.locals.slug = req.session.slug
    res.locals.profile_picture_src = req.session.profile_picture_src ? req.session.profile_picture_src : "http://placehold.it/32x32"
    console.log(`${req.ip} ${req.statusCode} - ${req.method} ${req.path}`)
    next();
})
app.use(express.static(__dirname + "/static"))

app.get("/", (req, res) => routes.home(req, res))
app.get('/search', (req, res) => routes.search(req, res))
app.get('/discover', (req, res) => routes.discover(req, res))
app.get('/privacypolicy', (req, res) => routes.privacypolicy(req, res))
app.get("/api", (req, res) => {
    apiRoutes.returnAllMethods(req, res);
})
app.get("/api/:apiroute", (req, res) => apiRoutes[req.params.apiroute](req, res))
app.get("*", (req, res) => routes.notFound(req, res))

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})