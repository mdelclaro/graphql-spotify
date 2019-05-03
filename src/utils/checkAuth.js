const SpotifyApi = require("../lib/client");

module.exports = () => {
  return new Promise((resolve, reject) => {
    try {
      SpotifyApi.getApi();
      const expiryDate = SpotifyApi.getExpiryDate();

      if (new Date() > expiryDate) {
        SpotifyApi.refreshToken()
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      }
      resolve();
    } catch (err) {
      reject(err);
      return err;
    }
    return;
  });
};
