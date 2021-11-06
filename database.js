const sqlite3 = require('sqlite3').verbose();

const versionDB = new sqlite3.Database('./database.db',
  (err) => {
    if (err) {
      console.error(err.message);
    }
  });

// create version_updates table if it does not exist
versionDB.run(`CREATE TABLE IF NOT EXISTS version_updates 
  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    version TEXT NOT NULL UNIQUE,
    message TEXT NULL
  )`);

versionDB.close();
