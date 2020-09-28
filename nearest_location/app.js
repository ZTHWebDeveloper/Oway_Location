const express=require('express')
const app=express()
const apiRouter = require('./routers/route')
const client=require('./connection/connnection')
require('dotenv').config()

const PORT=process.env.PORT

app.use('/',apiRouter);
app.listen(PORT, () => {
    console.log(`Servering is running at ${PORT}`)
})
