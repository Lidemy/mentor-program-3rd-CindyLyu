const request = require('request');
const process = require('process');

let after = '';
const limit = 200; // 要顯示幾筆，但如果不是輸入 100 的倍數就會最後印出資料數不正確
const count = limit / 100;
let gameID = '';
const gameName = process.argv[2];
const clientID = 'wdplbrt7uhnh4ep6lvk2ogkc1eyw6o';

const gameInf = {
  url: `https://api.twitch.tv/helix/games?name=${gameName}`,
  headers: {
    'Client-ID': `${clientID}`,
  },
};

request(gameInf, (error, response, body) => {
  const json = JSON.parse(body);
  const [obj] = json.data;
  gameID = obj.id;
  const key = {
    url: `https://api.twitch.tv/helix/streams?first=100&game_id=${gameID}&after=${after}`,
    headers: {
      'Client-ID': `${clientID}`,
    },
  };

  request(key, (error2, response2, body2) => {
    for (let j = 1; j <= count; j += 1) {
      const json2 = JSON.parse(body2);
      for (let c = 0; c < json2.data.length; c += 1) {
        console.log(json2.data[c].user_id, json2.data[c].user_name);
      }
      after = json2.pagination.cursor;
    }
  });
});
