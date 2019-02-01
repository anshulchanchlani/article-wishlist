const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios')
const passport = require('passport');
const bodyParser = require('body-parser')
const cors = require('cors');
const cookieSession = require('cookie-session');
const compression = require('compression')
const SECRET = 'ThisIsDummySecret';


require('./services');

app.use(compression())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'))


app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: ['ThisIsASuperSecretKeyOrIsIt']
    })
);

app.use(passport.initialize());
app.use(passport.session());


require('./authRoutes')(app);
require('./apiRoutes')(app);

app.get('/', (req, res) => {
    res.sendFile('index.html')
})


app.listen(8081,()=>{
    console.log('API server listening on 8081')
})
module.exports=app;