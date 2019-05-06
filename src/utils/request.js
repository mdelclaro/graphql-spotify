const request = require("request");

module.exports = options => {
  return new Promise((resolve, reject) => {
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
