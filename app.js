const express = require('express');
const bodyParser = require("body-parser");
const route = require('./Routes/routing');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', route);





const port = process.env.PORT || 3333;
app.set('port', port);

module.exports = app;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
