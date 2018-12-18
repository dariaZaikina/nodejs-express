const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapterAdventure = new FileSync('db.json');
const dbAdventure = low(adapterAdventure);

const adapterShowplace = new FileSync('db2.json');
const dbShowplace = low(adapterShowplace);

dbAdventure.defaults({ adventures: [] })
  .write();

dbShowplace.defaults({ showplaces: [] })
  .write();

module.exports = dbAdventure;
module.exports = dbShowplace;
