
const express = require('express');
const next = require('next');


const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = express();
const _next = next({ dev });
const handle = _next.getRequestHandler();


app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Running on PORT ${PORT}\nplease wait...`);
});
console.time("Ready");

_next.prepare().then(() => {
  console.timeEnd("Ready");
  // Example custom route
  app.get('/one', (req, res) => {
    res.send("one is 1")
  })
  app.get('/p/:id', (req, res) => {
    const actualPage = '/post';
    const queryParams = { id: req.params.id };
    _next.render(req, res, actualPage, queryParams);
  });
  // Handle all other routes with Next.js
  app.all((req, res) => {
    return handle(req, res);
  });
});