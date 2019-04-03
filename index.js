const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/token', (req, res) => {
  res.json({
    token: 'pk.eyJ1IjoibWFuaXNocmoiLCJhIjoiY2p0NDdqc3FiMWNsZDN5cDk0MGl1emo0biJ9.5SvFaGdLYlLdKM_IIyLGMg',
  });
});

const places = [
  { name: 'Rajgad', lat: 18.2618347, lng: 73.6345825, zoom: 14, },
  { name: 'Sinhagad', lat: 18.3663, lng: 73.7559, zoom: 14, },
];

app.get('/places', (req, res) => {
  res.json(places);
});

app.use('/', express.static(`${__dirname}/public`));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Started listening on: ${port}`);
});
