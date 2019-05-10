const request = require('request');

request(
  'https://lidemy-book-store.herokuapp.com/books',
  (error, response, body) => {
    const json = JSON.parse(body);
    for (let i = 0; i <= 9; i += 1) {
      const bookName = json[i].name.replace(/'/, '');
      console.log(`${json[i].id}  ${bookName}`);
    }
  },
);
