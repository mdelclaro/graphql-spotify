const { spotify_base_url } = require("../../config");
const request = require("../../utils/request");

module.exports = {
  artist: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        );
      }

      const options = {
        url: spotify_base_url + "/artists/" + args.id,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(options);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  artists: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        );
      }

      const options = {
        url: spotify_base_url + "/artists/?ids=" + args.ids,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(options);

      let artists = [];
      result.artists.map(artist => {
        artists.push(artist);
      });

      return artists;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
};
