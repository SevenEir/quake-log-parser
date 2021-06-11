const ParserFileData = function () {};

ParserFileData.prototype.parse = (file) => {
  const INIT_GAME_TEXT_LOG = 'InitGame:';
  const USE_TEXT_LOG = 'ClientUserinfoChanged:';
  const KILL_TEXT_LOG = 'Kill:';

  const data = mapGamesData(file);

  function  startGame (games, count) {
    const key = "game_" + count;
    return games[key] = {
        total_kills: 0,
        players: [],
        kills: {},
        id: count
      };
  }

  function  mapUserInfo (games, data) {
    var startPlayerName = data.trim().indexOf('n\\') + 2;
    var endPlayerName = data.trim().indexOf('\\t') - startPlayerName;
    var player = data.trim().substr(startPlayerName, endPlayerName);

    if(games[games.length - 1].players.indexOf(player) === -1){
      games[games.length - 1].players.push(player);
      games[games.length - 1].kills[player] = 0;
    }

    return games;
  }

  function  mapKillInfo (games, data) {
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

  function mapGamesData (file) {
    let gameData = [];
    const logFile = file.split('\n');
    let count = 1;

    logFile.forEach(line => {
      if(line.includes(INIT_GAME_TEXT_LOG)) {
        gameData.push(startGame(gameData, count));
        count++
      }
      if(line.includes(USE_TEXT_LOG)) {
        gameData = mapUserInfo(gameData, line);
      }
      if(line.includes(KILL_TEXT_LOG)) {
        gameData = mapKillInfo(gameData, line);
      }
    });
    return gameData;
  }

  return data;
}

module.exports = ParserFileData;