const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({ origin: '*' }));

app.get('/updates/:version', (req, res) => {
  const { version } = req.params;
  console.log(version);

  // get version message from database
  const versionDB = new sqlite3.Database('./database.db',
    (err) => {
      if (err) {
        console.error(err.message);

        return res.json({ success: false, message: 'An error occurred, please try again later.' });
      }
    });

  versionDB.get(
    'SELECT message FROM version_updates WHERE version = ?',
    [version],
    (err, row) => {
      if (err) {
        console.error(err.message);

        return res.json({ success: false, message: 'An error occurred, please try again later.' });
      }

      return res.json({ success: true, message: row ? row.message : '' });
    },
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
