const request = require("request");
const { spotify_base_url } = require("../config/");

exports.getRequest = (req, url) => {
  return new Promise((resolve, reject) => {
    if (!req.isAuth) {
      reject(
        new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        )
      );
    }

    const options = {
      url: spotify_base_url + url,
      headers: {
        Authorization: "Bearer " + req.token
      }
    };

    request.get(options, (error, response, body) => {
      if (error) {
        reject(new Error(error));
      }

      if (response.statusCode !== 200) {
        reject(new Error(body.error.message));
      }

      result = JSON.parse(body);

      if (result.error) {
        reject(result.error);
      }

      resolve(result);
    });
  });
};

exports.postRequest = (req, params) => {
  return new Promise((resolve, reject) => {
    if (!req.isAuth) {
      reject(
        new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        )
      );
    }

    const options = {
      url: spotify_base_url + params.url,
      headers: {
        Authorization: "Bearer " + req.token,
        "Content-type": "application/json"
      },
      body: params.body,
      json: params.json
    };

    request.post(options, (error, response, body) => {
      if (error) {
        reject(new Error(error));
      }

      if (response.statusCode !== 200 && response.statusCode !== 201) {
        reject(new Error(body.error.message));
      }

      if (body.error) {
        reject(body.error.message);
      }

      result = JSON.parse(JSON.stringify(body));

      resolve(result);
    });
  });
};
