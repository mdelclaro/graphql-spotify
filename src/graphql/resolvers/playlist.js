const request = require("request");
const { spotify_base_url } = require("../../config");

module.exports = {
  myPlaylists: (_, req) => {
    try {
      return new Promise((resolve, reject) => {
        if (!req.isAuth) {
          throw new Error(
            "This endpoint requires authentication. Go to /signin to authenticate."
          );
        }

        const options = {
          url: spotify_base_url + "/me/playlists",
          headers: {
            Authorization: "Bearer " + req.token
          }
        };

        request.get(options, (error, response, body) => {
          if (error) {
            console.log(error);
            throw new Error(error);
          }
          result = JSON.parse(body);
          let playlists = [];

          result.items.map(item => {
            playlists.push(item);
          });

          resolve(playlists);
        });
      });
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  userPlaylists: (args, req) => {
    try {
      return new Promise((resolve, reject) => {
        if (!req.isAuth) {
          throw new Error(
            "This endpoint requires authentication. Go to /signin to authenticate."
          );
        }

        const options = {
          url: spotify_base_url + "/users/" + args.userId + "/playlists",
          headers: {
            Authorization: "Bearer " + req.token
          }
        };

        request.get(options, (error, response, body) => {
          if (error) {
            console.log(error);
            throw new Error(error);
          }
          result = JSON.parse(body);
          let playlists = [];

          result.items.map(item => {
            playlists.push(item);
          });

          resolve(playlists);
        });
      });
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
};
