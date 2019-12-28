import bodyParser from 'body-parser';
import { checkToken } from './authorization';
import db from '../../models';

const { Book } = db;
const jsonParser = bodyParser.json();
// path for local server
const setBooksInfo = async (req, res, next) => {
  try {
    await Book.create({ ...req.body, UserId: req.id });
    next();
  } catch (e) {
    res.sendStatus(500);
  }
};

export default (app, upload) => {
  // add and get immediately book cover
  app.post('/api/book/cover', upload.single('cover'), (req, res) => {
    const mypath = `http://localhost:3000/resources/${req.file.filename}`;
    res.status(200).json({ path: mypath });
  });

  app.post('/api/user/books', checkToken, jsonParser, setBooksInfo, (req, res) => {
    if (req.userInfo) {
      res.status(200).json({
        token: req.userInfo.token,
        refreshToken: req.userInfo.refreshToken,
      });
    } else {
      res.sendStatus(200);
    }
  });
};
