const API = require("call-of-duty-api")();

const players = require("./players.json");

const getPlayerStats = (player) => {
  return new Promise((resolve, reject) => {
    API.MWwz(player["gamer_tag"], API.platforms[player["platform"]])
      .then((output) => {
        // console.log(player["name"]);
        resolve(output);
        // return output;

        // console.log(player["name"]);
        // console.log(output.lifetime.mode.br);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const getStats = async () => {
  const payload = [];

  for (let index = 0; index < players.length; index++) {
    let player = players[index];
    let stats = await getPlayerStats(player);
    payload.push({
      name: player["name"],
      gamer_tag: player["gamer_tag"],
      stats: stats,
    });
  }

  return payload;
};
