import { Op } from 'sequelize';
import db from '../../models';

const { Comment, Book } = db;
// Calculate and set book rating
const calcBookRating = (arr) => {
  const ratingSum = arr.reduce((sum, cur) => sum + cur.rating, 0);
  return ratingSum / arr.length;
};

export default (app, bookId) => {
  app.use(async () => {
    try {
      const rating = await Comment.findAll({
        where: {
          BookId: bookId,
          rating: {
            [Op.ne]: 0,
            [Op.ne]: null,
          },
        },
        raw: true,
      });
      const bookRating = Math.floor(calcBookRating(rating) * 10) / 10;

      await Book.update({
        rating: bookRating,
      }, {
        where: {
          id: bookId,
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  });
};
