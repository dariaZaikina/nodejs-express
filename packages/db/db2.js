const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');


const adapterShowplace = new FileSync('db2.json');
const dbShowplace = low(adapterShowplace);

dbShowplace.defaults({ showplaces: [] })
  .write();

module.exports = dbShowplace;
