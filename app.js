const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/auth')
const tasksRoutes = require('./routes/tasks')
const docsRoutes = require('./routes/docs')


const app = express()


app.use(cors())
app.use(bodyParser.json())

app.use('/auth',authRoutes)
app.use('/tasks',tasksRoutes)
app.use('/docs', docsRoutes)


app.use("/", (req,res) => {
  res.send(`Task Management API`);
})

app.listen(process.env.PORT,() => { 
  console.log(`Task Management Application API`)
})
