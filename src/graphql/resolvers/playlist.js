const { spotify_base_url } = require("../../config");
const request = require("../../utils/request");

module.exports = {
  myPlaylists: async (_, req) => {
    try {
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

      const result = await request(options);
      let playlists = [];

      result.items.map(item => {
        playlists.push(item);
      });

      resolve(playlists);
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  userPlaylists: async (args, req) => {
    try {
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

      const result = await request.get(options);
      let playlists = [];

      result.items.map(item => {
        playlists.push(item);
      });

      resolve(playlists);
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  playlist: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to authenticate."
        );
      }

      const options = {
        url: spotify_base_url + "/playlists/" + args.id,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request.get(options);

      resolve(result);
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
};
