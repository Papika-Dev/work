import db from './db';
import pgp from 'pg-promise';

const calcOffset = (off, max) => {
  if (+off > 1) return (off - 1) * max;
  return 0;
};

const searchingId = (req, res, next) => {
  if (req.query.q) {
    db.task(async t => {
      const searchingId = await t.any(`SELECT id FROM books 
      WHERE to_tsvector(title) @@ to_tsquery($1)
      OR  to_tsvector(author) @@ to_tsquery($1)`,
        [req.query.q]);

      const searchId = searchingId.map((item) => item.id)

      if (searchingId.length > 0) {
        const checkId = await t.any('SELECT id FROM books WHERE id IN ($1:csv)', [searchId]);
        const data = checkId.map((item) => item.id);
        req.searchId = data;
      }
    })
      .then(() => {
        next();
      })
      .catch((e) => {
        console.log(e)
      })
  } else next()
}

const getsResult = async (req, res, next) => {
  const offset = calcOffset(req.query.pagenum, req.query.limit);
  const values = {
    limit: req.query.limit,
    offset,
    sort: req.query.sort,
    inc_dec: req.query.inc_dec,
    search: req.query.q,
  };

  try {
    const where = pgp.as.format('WHERE id IN ($1:csv)', [req.searchId]);

    const product = await db.any(`SELECT * FROM books 
      ${req.searchId && where}
      ORDER BY $[sort:name] ${values.inc_dec}
      LIMIT $[limit] OFFSET $[offset]`, values);

    const { count } = await db.one(`SELECT count(*) FROM books ${req.searchId && where}`);
    // this two for experimet with quick search
    const titles = await db.any('SELECT DISTINCT (title) FROM books');
    const authors = await db.any('SELECT DISTINCT (author) FROM books');
    const data = {
      product,
      count,
      headers: [...titles.map((item) => item.title), ...authors.map((item) => item.author)],
    };
    req.data = data;
    next()
  } catch (e) {
    console.log(e)
  }
};

export default (app) => {
  app.use('/products/all', searchingId, getsResult, (req, res) => {
    if (req.query.q && !req.searchId) {
      res.status(200).json([]);
    } else {
      res.status(200).json(req.data);
    }


  })
};
