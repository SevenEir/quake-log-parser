const fs = require('fs');

const BASE_FILE = (__dirname + '/../log/games.log');
const INIT_GAME_TEXT_LOG = 'InitGame:';

const parserFileData = () => {
  const file = readFile();

  const data = mapGamesData(file);

  return data;
}

const readFile = () => {
  if (!fs.existsSync(BASE_FILE)) {
    throw new Error ('Arquivo não existe');
  }

  const logFile = fs.readFileSync(BASE_FILE, 'utf-8').toString();

  if(!logFile) {
    throw new Error ('Arquivo vazio');
  }

  return logFile;
}

const startGame = (count) => {
  return {
    [count]: {
      game_data:{
        total_kills: 0,
        players: [],
        kills: {}
      }
    }
  };
}

const mapGamesData = (file) => {
  let data = [];
  const logFile = file.split('\n');

  logFile.forEach((line, count )=> {
    if(line.includes(INIT_GAME_TEXT_LOG)) {
      data[count] = startGame(line);
    }

  });

  return data;
}
  console.log(parserFileData());
