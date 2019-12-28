import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import db from '../../models';

const jsonParser = bodyParser.json();
const secretKey = process.env.SECRET_KEY;

const { Session, User } = db;

const makeNewSession = async (req, next, name, id) => {
  try {
    const refreshToken = jwt.sign({
      id,
      name,
      ip: req.ip,
      os: req.useragent.os,
    },
    secretKey,
    { algorithm: 'HS256', expiresIn: '72h' });

    await Session.beforeCreate(() => {
      Session.destroy({
        where: {
          UserId: id,
        },
      });
    });

    await Session.create({
      name,
      ip: req.ip,
      os: req.useragent.os,
      UserId: id,
      userAgent: req.useragent.source,
      refreshToken,
    });

    const token = jwt.sign({
      id,
      ip: req.ip,
      os: req.useragent.os,
    },
    secretKey,
    { algorithm: 'HS256', expiresIn: '2h' });

    // eslint-disable-next-line require-atomic-updates
    req.userInfo = {
      token,
      name,
      refreshToken,
      id,
    };
    next();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

const authenticationUser = async (req, res, next) => {
  try {
    const data = await User.findOne({
      where: {
        mail: req.body.mail,
        password: req.body.password,
      },
    });
    if (data.dataValues) {
      makeNewSession(req, next, data.dataValues.name, data.dataValues.id);
    } else {
      throw new Error('User had not created');
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.sendStatus(403);
  }
};

const authentication = (app) => {
  app.post('/user/login', jsonParser, authenticationUser, (req, res) => {
    res.json(req.userInfo);
  });
};

export {
  authentication,
  makeNewSession,
};
