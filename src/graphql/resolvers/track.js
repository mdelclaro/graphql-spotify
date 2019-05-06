const { spotify_base_url } = require("../../config");
const request = require("../../utils/request");

module.exports = {
  track: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        );
      }

      const options = {
        url: spotify_base_url + "/tracks/" + args.id,
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

  tracks: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        );
      }

      const options = {
        url: spotify_base_url + "/tracks/?ids=" + args.ids,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(options);

      let tracks = [];
      result.tracks.map(track => {
        tracks.push(track);
      });

      return tracks;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
};
