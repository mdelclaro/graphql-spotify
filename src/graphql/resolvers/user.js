const request = require("request");
const { spotify_base_url } = require("../../config");

module.exports = {
  me: (_, req) => {
    try {
      return new Promise((resolve, reject) => {
        if (!req.isAuth) {
          throw new Error(
            "This endpoint requires authentication. Go to /signin to authenticate."
          );
        }

        const options = {
          url: spotify_base_url + "/me",
          headers: {
            Authorization: "Bearer " + req.token
          }
        };

        request.get(options, (error, response, body) => {
          if (error) reject(error);
          resolve(JSON.parse(body));
        });
      });
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
};
