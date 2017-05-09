const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const db = pgp({
  database: 'wiki_db'
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/pages', (req, resp, next) => {
  db.any('select * from page')
    .then(pages => resp.json(pages))
    .catch(next);
});

app.get('/api/lucky', (req, resp, next) => {
  console.log('hello, you have reached api-lucky');
  db.any('select * from page')
    .then(pages => {
      console.log("got pages");
      let numPages = pages.length;
      // let selectedPage = 0;
      let selectedPage = Math.floor(Math.random() * numPages);
      // console.log('selected page ' + selectedPage + ' out of ' + numPages);
      // console.log(pages[selectedPage]);
      return resp.json(pages[selectedPage]);
    })
    .catch(next);
});

app.get('/api/page/:title', (req, resp, next) => {
  let title = req.params.title;
  db.oneOrNone('select * from page where title = $1', title)
    .then(page => {
      if (page === null) {
        resp.status(404); // 404 not found
        resp.json({
          message: 'Page not found'
        });
      } else {
        resp.json(page);
      }
    })
    .catch(next);
});

app.post('/api/signup', (req,resp,next) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log('username: ' + username);
  console.log('password: ' + password);
  bcrypt.hash(password, 10)
  .then(encryptedPassword =>  {
    console.log(encryptedPassword);
    return db.one(`insert into users values (default, $1, $2, default) returning id`, [username, encryptedPassword]);
  }
  )
  .then(id => resp.json(id))
  .catch(next);

});

app.post('/api/signin', (req,resp,next) => {
  // let token = 
  console.log('starting signin process');
  var username = req.body.username;
  var password = req.body.password;
  var userid = null;
  console.log('username: ' + username);
  console.log('password: ' + password);
  db.one(`select id, password FROM users WHERE username ilike $1`, username)
  .then(loginResults => {
    console.log('loginResults: ', loginResults);
    userid = loginResults.id;
    return bcrypt.compare(password, loginResults.password)})
  .then(matched => {
    console.log("password matched: " + matched);
    return matched;

  })
  .then(id => resp.json(userid))
  .catch(next);

});

app.put('/api/page/:title', (req, resp, next) => {
  let title = req.params.title;
  let content = req.body.content;

  // this statement below either inserts or updates
  // the page - it is called "upsert"
  // See http://stackoverflow.com/questions/1109061/insert-on-duplicate-update-in-postgresql
  db.one(`
    insert into page values ($1, $2, now(), now())
    on conflict (title) do update
      set content = $2,
          time_modified = now()
    returning *
    `, [title, content])
    .then(page => resp.json(page))
    .catch(next);
});

app.use((err, req, resp, next) => {
  resp.status(500);
  resp.json({
    error: err.message,
    stack: err.stack.split('\n')
  });
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
