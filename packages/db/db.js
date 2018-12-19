const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapterAdventure = new FileSync('db.json');
const dbAdventure = low(adapterAdventure);


dbAdventure.defaults({ adventures: [] })
  .write();

module.exports = dbAdventure;
