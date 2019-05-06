const { spotify_base_url } = require("../../config");
const request = require("../../utils/request");

module.exports = {
  me: async (_, req) => {
    try {
      const options = {
        url: spotify_base_url + "/me",
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const me = await request(req, options);
      return me;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  user: async (args, req) => {
    try {
      const options = {
        url: spotify_base_url + "/users/" + args.id,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const user = await request(req, options);
      return user;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  myTopTracks: async (args, req) => {
    try {
      const options = {
        url: `${spotify_base_url}/me/top/tracks?time_range=${args.time_range}`,
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

  myTopArtists: async (args, req) => {
    try {
      const options = {
        url: `${spotify_base_url}/me/top/artists?time_range=${args.time_range}`,
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
  }
};
