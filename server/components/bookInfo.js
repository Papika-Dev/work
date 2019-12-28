import db from '../../models';

const { Book } = db;

export default (app) => {
  app.get('/book/card/:id', async (req, res) => {
    try {
      const book = await Book.findByPk(req.params.id);

      res.status(200).json(book.dataValue);
    } catch (e) {
      res.sendStatus(500);
    }
  });
};
