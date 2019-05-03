const SpotifyApi = require("../../lib/client");

let api;

module.exports = {
  me: () => {
    try {
      return new Promise((resolve, reject) => {
        api = SpotifyApi.getApi();
        return api.getMe((err, data) => {
          if (err) reject(err.message);

          const user = {
            id: data.body.id,
            country: data.body.country,
            display_name: data.body.display_name,
            email: data.body.email,
            href: data.body.href,
            images: data.body.images,
            product: data.body.product,
            uri: data.body.uri
          };
          resolve(user);
        });
      });
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
};
