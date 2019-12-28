/* eslint-disable no-console */
import bodyParser from 'body-parser';
import db from '../../models';

const { User } = db;
const jsonParser = bodyParser.json();
// check for user with same mail

const chekUser = async (req, res, next) => {
  try {
    const match = await User.findOne({
      where: {
        mail: req.body.mail,
      },
    });
    if (!match) {
      next();
    } else {
      res.status(403).send('Пользователь с такой почтой уже зарегистрирован');
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export default (app) => {
  // New User Registration
  app.post('/users/signin', jsonParser, chekUser, async (req, res) => {
    try {
      await User.create(req.body);
      res.json({ message: 'Успешно зарегистрирован' });
    } catch (e) {
      res.sendStatus(500);
    }
  });
};
