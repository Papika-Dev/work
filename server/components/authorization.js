import jwt from 'jsonwebtoken';
import { makeNewSession } from './authentication';
import db from '../../models';

const { Session, User } = db;
const secretKey = process.env.SECRET_KEY;


const checkToken = async (req, res, next) => {
  if (typeof req.headers.authorization !== 'undefined') {
    const token = req.headers.authorization.split(' ')[1];
    const refreshToken = req.headers.authorization.split(' ')[2];
    try {
      const encoded = await jwt.verify(token, secretKey, { algorithm: 'HS256' });
      // eslint-disable-next-line require-atomic-updates
      req.id = encoded.id;
      next();
    } catch (e) {
      try {
        const encod = await jwt.verify(refreshToken, secretKey, { algorithm: 'HS256' });
        const {
          ip,
          id,
          name,
          os,
        } = encod;
        const session = await Session.findOne({
          where: {
            userId: id,
            refreshToken,
          },
        });
        if (session.dataValues) {
          if (ip === req.ip && os === req.useragent.os) {
            makeNewSession(req, next, name, id);
            // eslint-disable-next-line require-atomic-updates
            req.id = encod.id;
          }
        } else {
          throw new Error('User has no exist');
        }
      } catch (er) {
        // eslint-disable-next-line no-console
        console.log(er);
        res.sendStatus(403);
      }
    }
  }
};

const authorization = (app) => {
  app.use('/user/verify', checkToken, async (req, res) => {
    try {
      const avatar = await User.findOne({
        where: {
          id: req.id,
        },
      }, {
        attributes: ['avatar'],
      });
      if (req.userInfo) {
        res.status(200).json({
          token: req.userInfo.token,
          refreshToken: req.userInfo.refreshToken,
          avatar: avatar.dataValues,
        });
      } else {
        res.status(200).json({ avatar: avatar.dataValues });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  });
};

export {
  authorization,
  checkToken,
};
