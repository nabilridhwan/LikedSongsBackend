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
    MONGODB_PASSWORD,
    PORT
} = process.env;

mongoose.connect(`mongodb+srv://spotifierv2admin:${MONGODB_PASSWORD}@spotifierv2.sw8xx.mongodb.net/users?retryWrites=true&w=majority`, {
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
    res.locals.appName = "Spoti"
    res.locals.slug = req.session.slug
    next();
})
app.use(express.static(__dirname + "/static"))

app.get('/', (req, res) => routes.home(req, res))
app.get('/profile', (req, res) => routes.profile(req, res))
app.get("/api/:apiroute", (req, res) => apiRoutes[req.params.apiroute](req, res))

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})