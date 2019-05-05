const SpotifyWebApi = require("spotify-web-api-node");

const {
  spotify_client_id,
  spotify_client_secret,
  redirect_uri
} = require("../config");

let SpotifyApi;

module.exports = {
  init: () => {
    const credentials = {
      clientId: spotify_client_id,
      clientSecret: spotify_client_secret,
      redirectUri: redirect_uri
    };
    SpotifyApi = new SpotifyWebApi(credentials);
    // expiryDate = new Date();
    // expiryDate.setSeconds(expiryDate.getSeconds() + expiresIn);
    return SpotifyApi;
  },
  getApi: () => {
    if (!SpotifyApi) {
      // throw new Error("SpotifyApi not initialized!");
      console.log("SpotifyApi not initialized!");
    }
    return SpotifyApi;
  },
  refreshToken: () => {
    return new Promise((resolve, reject) => {
      SpotifyApi.refreshAccessToken((err, data) => {
        if (err) {
          console.log("Could not refresh access token", err);
          reject(err);
        }
        if (data) {
          SpotifyApi.setAccessToken(data.body["access_token"]);
          if (data.body["refresh_token"]) {
            SpotifyApi.setRefreshToken(data.body["refresh_token"]);
          }
          resolve();
        }
      });
    });
  }
};
