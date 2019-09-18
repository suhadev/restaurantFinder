const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.port || 3001
const cors = require('cors')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())
app.post('/',(req,res)=>{
    //console.log(req.body)
    //console.log(res)
    let lat = req.body.latitude
    let long = req.body.longitude
    let config = {
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer wfjGJjybjdhG0J0LVynQTGytYSx3wWFq86tLagik1Q4VuQNV_RsSMldrz3tdjk_0oC30nRp1ba3PsvsXg1s5c7fx3Wcz9_ZgUcczJpRBcbXd2qLv2_TUH6s64KKbXHYx',
            'ClientId':'4hSQWl457aIX30JAQHeNRA',
            'AccessControlAllowOrigin' : '*'  
        }
    }
    axios.get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}`,config) .then((response)=>{
      console.log(response.data)
      res.send(response.data)
    }).catch((err)=>{
      console.log(err)
    })
})
app.listen(port,()=>{console.log("listening")})