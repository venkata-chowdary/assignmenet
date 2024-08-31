const express = require('express')
const { mongoose } = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
dotenv.config()

const cors = require('cors')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(cors())

app.use('/api/user', userRoutes)
app.listen(process.env.PORT, () => {
    console.log('server on 4000')
})


