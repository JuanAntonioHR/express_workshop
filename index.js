// Description: Main file of the project
// Used by: All files
// Uses: express, morgan, routes, middleware

// Dependencies
const morgan = require('morgan')
const express = require('express')
const app = express()
// Routes
const pokemon = require('./routes/pokemon')
const user = require('./routes/user')
// Middleware
const auth = require('./middleware/auth')
const notFound = require('./middleware/notFound')
const index = require('./middleware/index')

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index)
app.use("/user", user)
app.use(auth)
app.use("/pokemon", pokemon)
app.use(notFound)

app.listen(process.env.PORT || 3000, () =>  {
    console.log("Server is running...")
})