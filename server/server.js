import express from 'express';
import useragent from 'express-useragent';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import uniqid from 'uniqid';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';

const jsonParser = bodyParser.json();

// set options for database
const pgp = require('pg-promise')({
  promiseLib: Promise,
});

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'mydb',
  user: 'postgres',
  password: 'drevnieslezi2012',
};
const db = pgp(cn);


// create server
const app = express();
app.set('trust proxy', true);

const port = (process.env.PORT || 5000);

app.listen(port, (err) => {
  if (err) {
    console.log('Server is not started, error : ', err);
  } else {
    console.log('Server is started');
  }
});


// use information of client os / browser ..etc
app.use(useragent.express());

app.use('/resources', express.static(path.join(__dirname, 'uploads')));
// -------------REGISTRATION--------------

// check for user with same mail
const chekUser = (req, res, next) => {
  db.none('SELECT mail FROM users WHERE mail = $1', [req.body.mail])
    .then(() => next())
    .catch(() => {
      res.json({ message: 'Пользователь с такой почтой уже зарегистрирован' });
    });
};

// New User Registration
app.post('/users/signin', jsonParser, chekUser, (req, res) => {
  const user = {
    name: req.body.name,
    mail: req.body.mail,
    phone: req.body.phone,
    password: req.body.password,
  };

  db.none(`INSERT INTO users (name, mail, password, phone)
    VALUES ($1, $2, $3, $4)`, [user.name, user.mail, user.password, user.phone])
    .then(() => {
      res.json({ message: 'Успешно зарегистрирован' });
    })
    .catch(() => {
      res.sendStatus(403);
    });
});


// -------------------AUTHETICATION-----------------

// User Auth
const secretKey = fs.readFileSync('./server/secret/secret.key', 'utf8');

const makeNewSession = (req, data, next, id) => {
  const createdTime = Date.now();
  const expiredTime = new Date(createdTime + (24 * 60 * 60 * 1000));
  const refreshToken = uniqid();
  // clear user session , expected 1 user session for each
  db.none('DELETE FROM sessions WHERE user_id = $1', [id])
    .then(() => {
      // Create user session
      db.none(`INSERT INTO sessions (user_id, ip, os, user_agent, refresh_token, expired_at, created_at, name)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [id, req.ip, req.useragent.os, req.useragent.source,
          refreshToken, expiredTime, new Date(createdTime), data.name])
        .then(() => {
          jwt.sign({
            id,
            ip: req.ip,
            os: req.useragent.os,
          },
            secretKey,
            { algorithm: 'HS256', expiresIn: '1h' }, (err, token) => {
              req.userInfo = { token, name: data.name, refreshToken };
              next();
            });
        });
    });
};

const authenticationUser = (req, res, next) => {
  db.one('SELECT * FROM users WHERE mail = $1 AND password = $2', [req.body.mail, req.body.password])
    .then((data) => {
      makeNewSession(req, data, next, data.id);
    })
    .catch(() => {
      res.sendStatus(403);
    });
};

app.post('/user/login', jsonParser, authenticationUser, (req, res) => {
  res.json(req.userInfo);
});


// -----------------AUTHORIZATION--------------------

const authorizationUser = (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secretKey, { algorithm: 'HS256' }, (err, encoded) => {
      if (err) {
        res.sendStatus(403);
        throw new Error(' User has not auth');
      } else {
        req.id = encoded.id;
        next();
      }
    });
  } else {
    res.sendStatus(500);
  }
};

app.use('/user/verify', authorizationUser, (req, res) => {
  db.one('SELECT * FROM users WHERE id = $1', [req.id])
    .then((data) => {
      res.status(200).json({
        name: data.name,
        mail: data.mail,
        avatar: data.avatar,
        phone: data.phone,
        id: data.id,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


// --------------------REFRESH TOKEN ------------------

const useRefreshToken = (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const refToken = req.headers.authorization.split(' ')[1];
    db.one('SELECT * FROM sessions WHERE refresh_token = $1',
      [refToken])
      .then((data) => {
        if (data.expired_at <= (Math.floor(Date.now() / 1000))) {
          throw new Error('Refresh token was expire');
        }
        makeNewSession(req, data, next, data.user_id);
      })
      .catch(() => {
        res.sendStatus(403);
      });
  }
};

app.get('/refresh', useRefreshToken, (req, res) => {
  res.json({ token: req.userInfo.token, refreshToken: req.userInfo.refreshToken });
});


// Add Avatar picture


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './server/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uniqid()}${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

// Set avatar path to db
const setUrl = (req, res, next) => {
  // path for local server
  const mypath = `http://localhost:3000/resources/${req.file.filename}`;
  db.none('UPDATE users SET avatar = $1 WHERE id = $2 ', [mypath, req.id])
    .then(() => {
      req.avaterPath = mypath;
      next();
    })
    .catch(() => {
      res.sendStatus(403);
    });
};

app.post('/profile/avatar', upload.single('avatar'), authorizationUser, setUrl, (req, res) => {
  res.status(200).json({ url: req.avaterPath });
});

// ADD USERS BOOK TO DB

const setBooksInfo = (req, res, next) => {
  // path for local server
  db.none(`INSERT INTO books (user_id, title, author, description, cover, price, category)
   VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [req.id, req.body.title, req.body.author,
    req.body.description, req.body.url, req.body.price, req.body.category])
    .then(() => {
      next();
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(403);
    });
};
// add and get immediately book cover
app.post('/api/book/cover', upload.single('cover'), (req, res) => {
  const mypath = `http://localhost:3000/resources/${req.file.filename}`;
  res.status(200).json({ path: mypath });
});

app.post('/api/user/books', authorizationUser, jsonParser, setBooksInfo, (req, res) => {
  res.sendStatus(200);
});


// ** GET USER BOOKLIST

app.get('/api/user/:id/booklist', (req, res) => {
  const { id } = req.params;
  db.any('SELECT * FROM books WHERE user_id = $1', [id])
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.sendStatus(403);
    });
});

// GET BOOK INFO from Book card

app.get('/book/card/:id', (req, res) => {
  db.one('SELECT * FROM books WHERE id = $1', [req.params.id])
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => res.sendStatus(403));
});

// SET FAVORITES

app.use('/profile/user/:id/favorites', (req, res) => {
  const userId = req.params.id;
  db.any(`SELECT * FROM favorites 
          INNER JOIN books ON favorites.book_id = books.id
          WHERE favorites.user_id = $1;`, [userId])
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

const checkInDb = (req, res, next) => {
  db.none('SELECT * FROM favorites WHERE book_id = $1 AND user_id = $2;', [req.params.bookId, req.params.userId])
    .then(() => {
      next();
    })
    .catch(() => {
      res.sendStatus(500);
    });
};
app.use('/favorites/user:userId/book:bookId', checkInDb, (req, res) => {
  db.none('INSERT INTO favorites (book_id, user_id) VALUES ($1, $2);', [req.params.bookId, req.params.userId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => res.sendStatus(500));
});


// GET Comments from DB

app.get('/book/comment/book/:id', (req, res) => {
  db.any('SELECT * FROM comments WHERE book_id = $1 ORDER BY created_at DESC', [req.params.id])
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => res.sendStatus(500));
});


// ADD Comment to DB

app.use('/book/comment', jsonParser, (req, res, next) => {
  req.bookId = req.body.bookId;
  db.none('INSERT INTO comments (book_id, text, author_name, rating) VALUES ($1, $2, $3, $4);',
    [req.body.bookId, req.body.text, req.body.author, req.body.rating])
    .then(() => {
      next();
    })
    .catch((err) => {
      res.sendStatus(500);
      // eslint-disable-next-line no-console
      console.log(err);
    });
});

// Calculate and set book rating
const calcBookRating = (arr) => {
  const ratingSum = arr.reduce((sum, cur) => sum + cur.rating, 0);
  return ratingSum / arr.length;
};

app.use((req, res, next) => {
  db.any('SELECT rating FROM comments WHERE book_id = $1 AND rating <> $2', [req.bookId, 0])
    .then((data) => {
      const bookRating = Math.floor(calcBookRating(data) * 10) / 10;
      req.rating = bookRating;
      next();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
});

app.use((req, res) => {
  db.none('UPDATE books SET rating = $1 WHERE id = $2', [req.rating, req.bookId])
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});




app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
