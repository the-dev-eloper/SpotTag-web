
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv/config');
const cors = require('cors');

const app = express();
const api = process.env.API_URL;

// Middlewares
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');

app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

app.use(cors());
app.options('*', cors());

// Routers
const languageRouter = require('./routers/languageRouter');
const bugRouter = require('./routers/bugRouter');
const userRouter = require('./routers/userRouter');

app.use(`${api}/languages`, languageRouter);
app.use(`${api}/bugs`, bugRouter);
app.use(`${api}/users`, userRouter);

// Database
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'spot-tag'
})
    .then(() => {
        console.log('Database connection is ready..');
    })

    .catch((err) => {
        console.log(err);
    })

// Server
app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000/");
});
