/*
  Main index File 
*/
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const refLoad= require('./src/loader/reference.js');
const port = process.env.PORT ||3001
// Syncing all the models at once.
//  conn.sync().then(() => {
conn.sync({ force: true }).then(() => {
  refLoad()
  server.listen(port, () => {
    console.log(`Server listening at ${port}`); // eslint-disable-line no-console
  });
});

