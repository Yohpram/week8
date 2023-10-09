var express = require ('express');
var app = express();
var pool = require('./query.js');

var things = require ('./things.js');


app.use - ('/things',things);

app.get('/', (req, res) => {
  res.send('Hello User type "/film", "/category", or "/filmcategory" to show the data')
})

app.get('/film', (req, res) => {
  pool.query('SELECT*FROM public.film', (err,result) =>
  {
    if (err){
      throw err;
    }
    res.send(result.rows);
  });
});

app.get('/film/:id', (req, res) => {
  const filmId = req.params.id;

  pool.query('SELECT * FROM public.film WHERE film_id = $1', [filmId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data film.' });
    } else {
      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Film tidak ditemukan.' });
      } else {
        res.json(result.rows[0]);
      }
    }
  });
});

app.get('/category', (req, res) => {
  pool.query('SELECT*FROM public.category', (err,result) =>
  {
    if (err){
      throw err;
    }
    res.send(result.rows);
  });
});
app.get('/filmcategory', (req, res) => {
  pool.query('SELECT*FROM public.film_category', (err,result) =>
  {
    if (err){
      throw err;
    }
    res.send(result.rows);
  });
});



pool.connect((err, res) => {
        console.log(err);
        console.log('connected');
});

app.listen(3001);