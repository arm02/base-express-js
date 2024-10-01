const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { db } = require("./app/models");
db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });
require("./app/routes/auth.routes")(app);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  server.timeout = 2000000;
  console.log(`Server is running on port ${PORT}.`);
});
