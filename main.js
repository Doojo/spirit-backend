
const express = require('express');
const app = express();
const cors = require('cors');
const {connectToDB} = require('./db');
//connection to database
connectToDB();


app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// backend routes
app.get('/', (req, res) => {
  res.send({ message: 'Hello from  Backend' });
});

const port = 4000;
const host = "localhost";
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});