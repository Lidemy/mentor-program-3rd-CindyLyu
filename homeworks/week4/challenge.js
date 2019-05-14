const request = require('request');

let after = '';
const limit = 200; // 要顯示幾筆，但如果不是輸入 100 的倍數就會最後印出資料數不正確
const count = limit / 100;
const key = {
  url: `https://api.twitch.tv/helix/streams?first=100&game=21779&after=${after}`,
  headers: {
    'Client-ID': 'wdplbrt7uhnh4ep6lvk2ogkc1eyw6o',
  },
};

request(key, (error, response, body) => {
  for (let i = 1; i <= count; i += 1) {
    const json = JSON.parse(body);
    for (let j = 0; j < json.data.length; j += 1) {
      console.log(json.data[j].user_id, json.data[j].user_name);
    }
    after = json.pagination.cursor;
  }
});
