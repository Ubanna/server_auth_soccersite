const User = require('./models/User');
const UserSession = require('./models/UserSession');
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
var cors = require('cors')
const app = express()
require("dotenv/config")
app.use(cors());

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// var corsOptions = {
// 	origin: 'http://localhost:3000',
// 	optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));
app.use(bodyParser.json())

// mongoose.connect('mongodb://localhost:27017/soccerDatabase', {useNewUrlParser: true})
// .then(() => {
//     console.log('saved')
//   })
//   .catch((err) => {
//     console.log('Error on start: ' + err);
//     process.exit(1);
//   });


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
	.connect(`mongodb+srv://test:${process.env.CONNECTION}@cluster0-iiyzw.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true})
	.then(() => console.log('connected'))
	.catch((err) => console.log('failed to connect', err));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const PORT = process.env.PORT || 3006

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})




