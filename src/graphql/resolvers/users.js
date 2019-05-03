const SpotifyApi = require("../../lib/client");

let api;

module.exports = {
  me: () => {
    try {
      return new Promise((resolve, reject) => {
        api = SpotifyApi.getApi();
        return api.getMe((err, data) => {
          if (err) reject(err.message);
          resolve(data.body);
        });
      });
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  user: args => {
    try {
      return new Promise((resolve, reject) => {
        api = SpotifyApi.getApi();
        return api.getUser(args.id, (err, data) => {
          if (err) reject(err.message);
          resolve(data.body);
        });
      });
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
};
