import { checkToken } from './authorization';
import db from '../../models';

const { User } = db;

const setUrl = async (req, res, next) => {
// path for local server
  const mypath = `http://localhost:3000/resources/${req.file.filename}`;
  req.avatarPath = mypath;
  try {
    await User.update({
      avatar: mypath,
    }, {
      where: {
        id: req.id,
      },
    });
    next();
  } catch (e) {
    res.sendStatus(403);
  }
};

export default (app, upload) => {
  app.post('/profile/avatar', upload.single('avatar'), checkToken, setUrl, (req, res) => {
    if (req.userInfo) {
      res.status(200).json({
        token: req.userInfo.token,
        refreshToken: req.userInfo.refreshToken,
        url: req.avatarPath,
      });
    } else {
      res.status(200).json({ url: req.avatarPath });
    }
  });
};
