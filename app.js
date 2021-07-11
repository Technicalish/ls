var express = require('express');
var app = express();
var cors = require('cors');
var db = require('level')(__dirname + '/lsdb');
app.use(cors({
  "origin": "*"
}));
app.post('/'
, require('multer')().none()
, async function(req, res) {
var { url, domain, pathname } = req.body;
  if (!pathname) {
  pathname = require('crypto').randomBytes(4).toString('hex');
  }
  db.get(pathname)
  .then(() => {
  res.status(403).json({"url": domain + '/' + pathname});
  })
  .catch(e => {
    db.put(pathname, url)
    .then(() => {
    res.json({"url": domain + '/' + pathname});
    });
  });
});
app.get('*', async function(req, res) {
  db.get(req.path.substring(1))
  .then(url => res.redirect(301, url))
  .catch(e => res.status(404).end());
});
module.exports = app;
 
