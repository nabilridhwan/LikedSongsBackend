let express = require('express')
let app = express();
let routes = require('./routes')
let cors = require('cors')


app.use(cors())

app.get('/', (req, res) => routes.home(req,res))
app.get('/getRedirectLink', (req, res) => routes.getRedirectLink(req,res))
app.get('/callback', (req,res) => routes.callback(req,res))

app.listen(3000, () => {
    console.log("Running!")
})