const SpotifyApi = require("../../lib/client");

module.exports = {
  me: () => {
    try {
      return new Promise((resolve, reject) => {
        let api = SpotifyApi.getApi();
        api.getMe((err, data) => {
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
        let api = SpotifyApi.getApi();
        api.getUser(args.id, (err, data) => {
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
