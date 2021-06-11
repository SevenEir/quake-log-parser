const fs = require('fs');

const BASE_FILE = (__dirname + '/../log/games.log');

const readFile = () => {
  const logFile = fs.readFileSync(BASE_FILE, 'utf-8').toString();

  return logFile;
}

console.log(readFile());
