const request = require("request");

module.exports = (req, options) => {
  return new Promise((resolve, reject) => {
    if (!req.isAuth) {
      reject(
        new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        )
      );
    }

    request.get(options, (error, response, body) => {
      if (error) {
        reject(new Error(error));
      }

      if (!response.statusCode) {
        reject(new Error("Error " + response.statusCode));
      }

      result = JSON.parse(body);
      if (result.error) {
        reject(result.error);
      }

      resolve(result);
    });
  });
};
