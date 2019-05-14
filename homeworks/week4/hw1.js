const request = require('request');

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    if (error) {
      return console.log('發生錯誤', error);
    }
    const json = JSON.parse(body);
    return json.forEach((item) => {
      console.log(`${item.id} ${item.name}`);
    });
  },
);
