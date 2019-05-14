const request = require('request');

const key = {
  url: 'https://api.twitch.tv/helix/games/top',
  qs: { first: 100, name: 'League of Legends' },
  headers: {
    'Client-ID': 'wdplbrt7uhnh4ep6lvk2ogkc1eyw6o',
  },
};

request(key, (error, response, body) => {
  const json = JSON.parse(body);
  for (let i = 0; i < json.data.length; i += 1) {
    console.log(json.data[i].id, json.data[i].name);
  }
});
