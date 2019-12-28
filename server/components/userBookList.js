import db from '../../models';

const { Book } = db;

export default (app) => {
  app.get('/api/user/:id/booklist', async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Book.findAll({
        where: {
          UserId: id,
        },
        raw: true,
      });
      res.json(data);
    } catch (e) {
      res.sendStatus(500);
    }
  });
};
