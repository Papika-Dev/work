import bodyParser from 'body-parser';
import db from '../../models';

const jsonParser = bodyParser.json();

const { Op } = db.Sequelize.Op;
const { Book, Sequelize, sequelize } = db;

const calcOffset = (off, max) => {
  if (+off > 1) return (off - 1) * max;
  return 0;
};

const getsResult = async (req, res, next) => {
  const offset = calcOffset(req.body.pageNum, req.body.limit);
  let result;

  try {
    result = await Book.findAll({
      where: {
        sale: req.body.sale,
      },
      offset,
      limit: req.body.limit,
      order: [[req.body.sort, req.body.incDec]],
    });
    if (req.query.q) {
      result = await result.findAll({
        where: {
          [Op.or]: [
            {
              author: {
                [Op.iLike]: `%${req.query.q}%`,
              },
              title: {
                [Op.iLike]: `%${req.query.q}%`,
              },
            },
          ],
        },
      });
    }
    if (req.body.category) {
      result = await result.findAll({
        where: {
          category: {
            [Op.iLike]: req.body.category,
          },
        },
      });
    }
    if (req.body.cost.min) {
      result = await result.findAll({
        where: {
          price: {
            [Op.between]: [req.body.cost.min, req.body.cost.max],
          },
        },
      });
    }

    const data = {
      product: result.map((item) => item.dataValues),
      count: result.length,
    };
    // eslint-disable-next-line require-atomic-updates
    req.data = data;
    next();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
  }
};

export default (app) => {
  app.get('/product/headers', async (req, res) => {
    try {
      // this two for experimet with quick search
      const titles = await Book.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('title')), 'title'],
        ],
        raw: true,
      });
      const authors = await Book.findAll({
        attributes: [
          [sequelize.fn('DISTINCT', sequelize.col('author')), 'author'],
        ],
        raw: true,
      });
      const headers = [...titles.map((item) => item.title), ...authors.map((item) => item.author)];
      res.status(200).json(headers);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.get('/product/max/price', async (req, res) => {
    try {
      const data = await Book.findOne({
        group: ['id'],
        attributes: [
          [sequelize.fn('max', sequelize.col('price')), 'max'],
        ],
        raw: true,
      });
      res.status(200).json(data);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  app.post('/products/all', jsonParser, getsResult, (req, res) => {
    if (!req.data) {
      res.status(200).json([]);
    } else {
      res.status(200).json(req.data);
    }
  });
};
