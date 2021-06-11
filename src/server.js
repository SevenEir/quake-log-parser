
const express = require('express');
const ParserFileData = require('./parser/ParserFileData');
const fs = require('fs');
const app = express();

app.get('/games', (req, res) => {
  fs.readFile('./log/games.log', (error, file) => {
    if(error) {
      console.log(error);
      res.status(500).send({ message : error });
    }

    let textFile = file.toString();
    let data = new ParserFileData();
    let result = data.parse(textFile);

    res.json(result);
  });
});

app.listen(3001, () => {
  console.log('Server online!');
});

// const express = require('express');
// const app = express();
// const fs = require('fs');
// const ParserFileData = require('./parser/ParserFileData');

// app.get('/games', (req, res) => {
//   fs.readFile('./log/games.log', (error, file) => {
//     if(error) {
//       console.log(error);
//       res.status(500).send({ message : error });
//     }

//     let textFile = file.toString();
//     let data = new ParserFileData();
//     let result = data.parse(textFile);

//     res.json(result);
//   });
// });

// app.get('/games/:id', (req, res) => {
//   fs.readFile('./log/games.log', (error, file) => {
//     if(error) {
//       console.log(error);
//       res.status(500).send({ message : error });
//     }

//     let textFile = file.toString();
//     let data = new ParserFileData().parse(textFile);
//     const result = data[`game_${req.params.id}`]

//     res.json(result);
//   });
// });

// app.listen(3001, () => {
//   console.log('Server online!');
// });

