const User = require('./models/User');
const UserSession = require('./models/UserSession');
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
var cors = require('cors')
const app = express()
require("dotenv/config")
// app.use(cors());

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

var corsOptions = {
	origin: 'https://landingpage.danekehu.now.sh/',
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.json())



// Import Routes
const postsRoute = require('./routes/posts')
const getRoute = require('./routes/get')
const updateRoute = require('./routes/update')
const deleteRoute = require('./routes/delete')

// Middlewares
app.use('/posts', postsRoute)
app.use('/update', updateRoute)
app.use('/get', getRoute)
app.use('/delete', deleteRoute)


mongoose
	.connect('mongodb+srv://test:123@cluster0-iiyzw.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
	.then(() => console.log('connected'))
	.catch((err) => console.log('failed to connect', err));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const PORT = process.env.PORT || 3006

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})




