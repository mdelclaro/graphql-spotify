const { spotify_base_url } = require("../../config");
const request = require("../../utils/request");

module.exports = {
  me: async (_, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        );
      }

      const options = {
        url: spotify_base_url + "/me",
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

  user: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        );
      }

      const options = {
        url: spotify_base_url + "/users/" + args.id,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(options);
      return result;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
};
