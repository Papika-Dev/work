import { Op } from 'sequelize';
import db from '../../models';

const { Book } = db;

const newProd = (app) => {
  app.use('/product/news', async (req, res) => {
    const maxDate = new Date();
    const minDate = new Date(maxDate - (60 * 60 * 24 * 1000));
    try {
      const data = await Book.findAll({
        where: {
          createdAt: {
            [Op.lt]: maxDate,
            [Op.gte]: minDate,
          },
        },
        raw: true,
      });
      res.status(200).json(data);
    } catch (e) {
      res.sendStatus(500);
      console.log(e);
    }
  });
};

export default newProd;
