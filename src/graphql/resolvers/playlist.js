const { spotify_base_url } = require("../../config");
const request = require("../../utils/request");

module.exports = {
  myPlaylists: async (_, req) => {
    try {
      const options = {
        url: spotify_base_url + "/me/playlists",
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(req, options);
      return result.items;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  userPlaylists: async (args, req) => {
    try {
      const options = {
        url: spotify_base_url + "/users/" + args.id + "/playlists",
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(req, options);
      return result.items;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  playlist: async (args, req) => {
    try {
      const options = {
        url: spotify_base_url + "/playlists/" + args.id,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(req, options);

      let tracks = [];
      result.tracks.items.map(item => {
        tracks.push(item);
      });
      result.tracks = tracks;

      return result;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
};
