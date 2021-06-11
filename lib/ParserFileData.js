const fs = require('fs');

const BASE_FILE = (__dirname + '/../log/games.log');
const INIT_GAME_TEXT_LOG = 'InitGame:';
const USE_TEXT_LOG = 'ClientUserinfoChanged:';
const KILL_TEXT_LOG = 'Kill:';

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

const startGame = (games, count) => {
  const key = "game_" + count;
  return games[key] = {
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

const mapKillInfo = (games, data) => {
  const regex = /:\s(\D.*)/gm;
  const player_killed_text = 'killed';
  const killed_text_length = 7;
  const world_player_text = '<world>'

  const deathInfo = regex.exec(data)[1];
  const player = deathInfo.slice(0, deathInfo.indexOf(player_killed_text)).trim();
  const deadPlayer = deathInfo.slice(deathInfo.indexOf(player_killed_text) + killed_text_length, deathInfo.indexOf(' by ')).trim();

  if(player !== deadPlayer) {
    if(player === world_player_text) {
      games[games.length - 1].kills[deadPlayer] -= 1;
    } else {
      games[games.length - 1].kills[player] += 1;
    }
  }

  games[games.length - 1].total_kills += 1;
  return games;
}

const mapGamesData = (file) => {
  let data = [];
  const logFile = file.split('\n');
  let count = 1;

  logFile.forEach(line => {
    if(line.includes(INIT_GAME_TEXT_LOG)) {
      data.push(startGame(data, count));
      count++
    }
    if(line.includes(USE_TEXT_LOG)) {
      data = mapUserInfo(data, line);
    }
    if(line.includes(KILL_TEXT_LOG)) {
      data = mapKillInfo(data, line);
    }
  });
  return data;
}

  console.log(parserFileData());
