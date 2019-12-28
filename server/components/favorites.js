import db from '../../models';

const { Favorite, Book, User } = db;

export default (app) => {
  app.use('/profile/user:id/book:bookId/favorites/remove', async (req, res) => {
    const { id, bookId } = req.params;
    try {
      await Favorite.destroy({
        where: {
          UserId: id,
          BookId: bookId,
        },
      });
      await res.status(200).json({ isFavor: false });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  app.use('/profile/user:id/book:bookId/favorites', async (req, res) => {
    const { id, bookId } = req.params;
    try {
      const isFavorite = await Favorite.findOne({
        where: {
          UserId: id,
          BookId: bookId,
        },
      });
      if (isFavorite.dataValue) {
        res.status(200).json({ isFavor: true });
      }
    } catch (e) {
      res.json({ isFavor: false });
    }
  });

  const checkInDb = async (req, res, next) => {
    try {
      const match = await Favorite.findAll({
        where: {
          BookId: req.params,
        },
      });
      if (!match.dataValue) {
        next();
      }
    } catch (e) {
      res.sendStatus(500);
    }
  };

  app.use('/favorites/user:userId/book:bookId', checkInDb, async (req, res) => {
    try {
      await Favorite.create({
        UserId: req.params.userId,
        BookId: req.params.bookId,
      });
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.use('/profile/user/:id/favorites', async (req, res) => {
    try {
      const data = await Favorite.findAll({
        include: [{
          model: Book,
          include: [{
            model: User,
            where: {
              id: req.params.id,
            },
          }],
        }],
      });
      res.json(data.dataValue);
    } catch (err) {
      res.json({});
    }
  });
};
