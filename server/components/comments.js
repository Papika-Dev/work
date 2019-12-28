import bodyParser from 'body-parser';
import db from '../../models';

const { Comment, Book, User } = db;
const jsonParser = bodyParser.json();

export default (app) => {
  app.get('/book/comment/book/:id', async (req, res) => {
    try {
      const data = await Comment.findAll({
        where: {
          id: req.params.id,
        },
        raw: true,
      }, {
        order: [['createdAt', 'DESC']],
      });
      if (data) {
        res.status(200).json(data);
      }
    } catch (e) {
      res.sendStatus(500);
    }
  });


  // ADD Comment to DB

  app.use('/book/comment', jsonParser, async (req, res, next) => {
    const comment = {
      bookId: req.body.bookId,
      text: req.body.text,
      authorName: req.body.author,
      rating: req.body.rating,
    };
    try {
      await Comment.create(comment);
      next();
    } catch (e) {
      res.sendStatus(500);
      // eslint-disable-next-line no-console
      console.log(e);
    }
  });
  // Set that the new comment was read
  app.use('/profile/notifications/check/book:bookId', async (req, res) => {
    const { bookId } = req.params;
    try {
      db.Comment.update({
        isRead: true,
      }, {
        where: {
          BookId: bookId,
        },
      });
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  });

  // Geting comments wich have a status is_read = false
  app.use('/profile/notifications/user:id', async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Comment.findAll({
        include: [{
          model: Book,
          include: [{
            model: User,
            where: {
              id,
            },
          }],
        }],
      }, {
        attributes: ['id', 'title', db.sequelize.fn('COUNT', db.sequelize.col('*')), 'count'],
      });
      if (data.dataValue) {
        res.status(200).json(data);
      }
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });
};
