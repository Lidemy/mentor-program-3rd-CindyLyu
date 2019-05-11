const request = require('request');

const argv = process.argv.splice(2);
let urlPath = argv[1];
let limit = 0;
if (argv[0] === 'list') {
  urlPath = '?_limit=20';
  limit = 19;
}

request(
  `https://lidemy-book-store.herokuapp.com/books/${urlPath}`,
  (error, response, body) => {
    const json = JSON.parse(body);
    for (let i = 0; i <= limit; i += 1) {
      if (limit === 0) {
        const bookName = json.name.replace(/'/, '');
        console.log(`${json.id} ${bookName}`);
      } else {
        const bookName = json[i].name.replace(/'/, '');
        console.log(`${json[i].id}  ${bookName}`);
      }
    }
  },
);
