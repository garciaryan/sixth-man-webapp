require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = 8000
const unirest = require('unirest')
const BASE_URL = 'https://fantasysports.yahooapis.com/fantasy/v2/';
const LEAGUE_ID = '41527';

app.use(express.json())

app.post('/api/authorize', cors(), (req, res) => {
  unirest
    .post('https://api.login.yahoo.com/oauth2/get_token')
    .headers({
      'Authorization': "Basic " + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    })
    .send({
      'client_id': process.env.CLIENT_ID,
      'client_secret': process.env.CLIENT_SECRET,
      'redirect_uri': 'oob',
      'code': req.body.code,
      'grant_type': 'authorization_code'
    })
    .end(response => {
      res.send(response.body);
    })
});

app.post('/api/new_token', cors(), (req, res) => {
  unirest
    .post('https://api.login.yahoo.com/oauth2/get_token')
    .headers({
      'Authorization': "Basic " + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    })
    .send({
      'client_id': process.env.CLIENT_ID,
      'client_secret': process.env.CLIENT_SECRET,
      'redirect_uri': 'oob',
      'refresh_token': req.body.refreshToken,
      'grant_type': 'refresh_token'
    })
    .end(response => {
      res.send(response.body);
    })
});

app.get('/api/home', cors(), (req, res) => {
  unirest
    .get(`${BASE_URL}league/nba.l.${LEAGUE_ID}`)
    .headers({
      'Authorization': 'Bearer ' + req.headers['accesstoken'],
      'Content-Type': 'application/x-www-form-urlencoded',
    })
    .end(response => {
      res.send(response.body);
    })
});

app.get('/', (req, res) => {
  console.log(process.env.CLIENT_ID)
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})