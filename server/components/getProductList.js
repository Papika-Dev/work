import pgp from 'pg-promise';
import db from './db';


const calcOffset = (off, max) => {
  if (+off > 1) return (off - 1) * max;
  return 0;
};

const searchingId = (req, res, next) => {
  if (req.query.q) {
    db.task(async (t) => {
      const lookingForId = await t.any(`SELECT id FROM books 
      WHERE to_tsvector(title) @@ plainto_tsquery($1)
      OR  to_tsvector(author) @@ plainto_tsquery($1)`,
        [req.query.q]);

      if (lookingForId.length > 0) {
        const searchId = lookingForId.map((item) => item.id);
        const checkId = await t.any('SELECT id FROM books WHERE id IN ($1:csv)', [searchId]);
        const data = checkId.map((item) => item.id);
        // eslint-disable-next-line require-atomic-updates
        req.searchId = data;
      }
    })
      .then(() => {
        next();
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  } else next();
};

const useProductFilter = (category, cost) => {
  let filterQuery = 'books'
  if (category) {
    filterQuery = pgp.as.format('(SELECT * FROM books WHERE to_tsvector(category) @@ plainto_tsquery($1))', [category])
  }
  if (cost) {
    filterQuery = pgp.as.format('(SELECT * FROM books WHERE price IN ($1:csv))', [cost])
  }
  if (cost && category) {
    filterQuery = pgp.as.format('(SELECT * FROM books WHERE to_tsvector(category) @@ plainto_tsquery($1) AND price IN ($2:csv))', [category, cost])
  }
  return filterQuery;
}

const getsResult = async (req, res, next) => {
  const offset = calcOffset(req.query.pagenum, req.query.limit);
  const values = {
    limit: req.query.limit,
    offset,
    sort: req.query.sort,
    inc_dec: req.query.inc_dec,
    search: req.query.q,
    category: req.query.category,
  };

  try {
    console.log(useProductFilter(req.query.category))
    const where = pgp.as.format('WHERE id IN ($1:csv)', [req.searchId,]);

    const product = await db.any(`SELECT * FROM ${useProductFilter(req.query.category)} 
      ${req.searchId && where}
      ORDER BY $[sort:name] ${values.inc_dec}
      LIMIT $[limit] OFFSET $[offset]`, values);

    const { count } = await db.one(`SELECT count(*) FROM 
    ${useProductFilter(req.query.category)}
     ${req.searchId && where}`);
    const data = {
      product,
      count,
    };
    // eslint-disable-next-line require-atomic-updates
    req.data = data;
    next();
  } catch (e) {
    console.log(e);
  }
};

export default (app) => {
  app.get('/product/headers', async (req, res) => {
    try {
      // this two for experimet with quick search
      const titles = await db.any('SELECT DISTINCT (title) FROM books');
      const authors = await db.any('SELECT DISTINCT (author) FROM books');
      const headers = [...titles.map((item) => item.title), ...authors.map((item) => item.author)];

      res.status(200).json(headers);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  app.use('/products/all', searchingId, getsResult, (req, res) => {
    if (req.query.q && !req.searchId) {
      res.status(200).json([]);
    } else {
      res.status(200).json(req.data);
    }
  });

};