const { spotify_base_url } = require("../../config");
const request = require("../../utils/request");

module.exports = {
  track: async (args, req) => {
    try {
      const options = {
        url: spotify_base_url + "/tracks/" + args.id,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(req, options);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  tracks: async (args, req) => {
    try {
      const options = {
        url: spotify_base_url + "/tracks/?ids=" + args.ids,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(req, options);
      return result.tracks;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
};
