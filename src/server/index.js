const express = require('express')
var cors = require("cors")
var bodyParser = require("body-parser")
var dotenv = require('dotenv')
const path = require("path")

dotenv.config()

const port = process.env.PORT;
const app = express()
//app.use(express.static('dist'))
app.use(express.static('dist'))

app.use(cors())

app.use(bodyParser.json({
    extended: true,
}))

let data = {
}

const AYLIENTextAPI = require("aylien_textapi")
const textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID ,
  application_key: process.env.API_KEY,
})


app.get('/', (req,res) =>{ 
  res.sendFile('dist/index.html')
})

app.get('/sentiment',(req,res) => {
  console.log(data)
    res.send(data)
})

app.post('/sentiment', (req,res) => {
  if(req.body.text) {

    textapi.sentiment({
      text: req.body.text,
      mode: 'tweet'
    }, (error, response) => {
      if (error === null) {
        data = response
      }
    });

    
    
  }
  else 
  {
    res.send("There is no text to process!")
  }
})

app.listen(port, () => {
  console.log(`App is listening on port : ${port}`)
})