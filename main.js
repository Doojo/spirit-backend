
const express = require('express');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// backend routes
app.get('/', (req, res) => {
  res.send({ message: 'Hello from  Backend' });
});


app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});