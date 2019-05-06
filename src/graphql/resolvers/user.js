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

      const me = await request(options);
      return me;
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

      const user = await request(options);
      return user;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  },

  myTop: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        );
      }

      const options = {
        url: `${spotify_base_url}/me/top/${args.type}?time_range=${
          args.time_range
        }`,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(options);

      let myTop;

      if (args.type === "artists") myTop = { artists: result.items };
      if (args.type === "tracks") myTop = { tracks: result.items };

      return myTop;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
};
