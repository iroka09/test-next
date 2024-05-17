
const express = require('express');
const next = require('next');


const _next = next({ dev: process.env.NODE_ENV !== 'production' });


_next.prepare().then(() => {
  const handle = _next.getRequestHandler();
  const app = express();
  const PORT = process.env.PORT || 8080;
  app.use((req, res, next) => {
    console.log("Express Server1 Called.")
    next()
  })
  app.get('/express', (req, res) => {
    res.send("SERVER ONE")
  })
  app.get('/a/:id', (req, res) => {
    const actualPage = '/about';
    const queryParams = { id: req.params.id };
    _next.render(req, res, actualPage, queryParams);
  });
  app.all((req, res) => {
    return handle(req, res);
  });
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Running on PORT ${PORT}`);
  });
});