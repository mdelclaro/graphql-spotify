const { spotify_base_url } = require("../../config");
const request = require("../../utils/request");

module.exports = {
  album: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        );
      }

      const options = {
        url: spotify_base_url + "/albums/" + args.id,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(options);

      result.tracks = result.tracks.items;

      return result;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  albums: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        );
      }

      const options = {
        url: spotify_base_url + "/albums/?ids=" + args.ids,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(options);

      let albums = [];
      result.albums.map(album => {
        album.tracks = album.tracks.items;
        albums.push(album);
      });

      console.log(albums);

      return albums;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
};
