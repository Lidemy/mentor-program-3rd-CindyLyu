const request = require('request');

const argv = process.argv.splice(2);
let limit = 0;
if (argv[0] === 'list') {
  limit = 19;
  request(
    'https://lidemy-book-store.herokuapp.com/books/?_limit=20',
    (error, response, body) => {
      const json = JSON.parse(body);
      for (let i = 0; i <= limit; i += 1) {
        const bookName = json[i].name.replace(/'/, '');
        console.log(`${json[i].id} ${bookName}`);
      }
    },
  );
} else if (argv[0] === 'delete') {
  request.delete(
    { url: `https://lidemy-book-store.herokuapp.com/books/${argv[1]}` },
  );
} else if (argv[0] === 'create') {
  request.post(
    'https://lidemy-book-store.herokuapp.com/books/',
  ).form(
    { name: argv[1] },
  );
} else if (argv[0] === 'update') {
  request.patch(
    `https://lidemy-book-store.herokuapp.com/books/${argv[1]}`,
  ).form({ name: argv[2] });
} else {
  const [, urlPath] = argv;
  request(
    `https://lidemy-book-store.herokuapp.com/books/${urlPath}`,
    (error, response, body) => {
      const json = JSON.parse(body);
      if (limit === 0) {
        const bookName = json.name.replace(/'/, '');
        console.log(`${json.id} ${bookName}`);
      }
    },
  );
}
