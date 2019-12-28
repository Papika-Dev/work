import { Op } from 'sequelize';
import db from '../../models';

const { Comment, Book } = db;
// Calculate and set book rating
const calcBookRating = (arr) => {
  const ratingSum = arr.reduce((sum, cur) => sum + cur.rating, 0);
  return ratingSum / arr.length;
};

export default (app) => {
  app.use(async (req, res) => {
    try {
      const rating = await Comment.findAll({
        where: {
          BookId: req.bookId,
          rating: {
            [Op.ne]: 0,
            [Op.ne]: null,
          },
        },
        raw: true,
      });
      const bookRating = Math.floor(calcBookRating(rating) * 10) / 10;

      await Book.update({
        bookRating,
      }, {
        where: {
          id: req.bookId,
        },
      });

      await res.sendStatus(200);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      res.sendStatus(500);
    }
  });
};
