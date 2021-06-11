const express = require('express');

const app = express();

app.get('/', (request, response) => {
  return response.json({ content: "Hello World" });
});

app.listen(3001, () => {
  console.log('Backend Online.')
});
