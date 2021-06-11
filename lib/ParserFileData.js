const fs = require('fs');

const BASE_FILE = (__dirname + '/../log/games.log');
const INIT_GAME_TEXT_LOG = 'InitGame:';
const USE_TEXT_LOG = 'ClientUserinfoChanged:';

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
      total_kills: 0,
      players: [],
      kills: {},
      id: count
    };
}

const mapUserInfo = (games, data) => {
  var startPlayerName = data.trim().indexOf('n\\') + 2;
  var endPlayerName = data.trim().indexOf('\\t') - startPlayerName;
  var player = data.trim().substr(startPlayerName, endPlayerName);

  if(games[games.length - 1].players.indexOf(player) === -1){
    games[games.length - 1].players.push(player);
    games[games.length - 1].kills[player] = 0;
  }

  return games;
}

const mapGamesData = (file) => {
  let data = [];
  const logFile = file.split('\n');
  let count = 0;

  logFile.forEach(line => {
    if(line.includes(INIT_GAME_TEXT_LOG)) {
      data.push(startGame(count));
      count++
    }
    if(line.includes(USE_TEXT_LOG)) {
      data = mapUserInfo(data, line, count);
    }
  });
  return data;
}
  console.log(parserFileData());
