const { spotify_base_url } = require("../../config");
const request = require("../../utils/request");

module.exports = {
  artist: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        );
      }

      const options = {
        url: spotify_base_url + "/artists/" + args.id,
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

  artists: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        );
      }

      const options = {
        url: spotify_base_url + "/artists/?ids=" + args.ids,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(options);
      const artists = result.artists;

      return artists;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  artistTopTracks: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        );
      }

      const options = {
        url: `${spotify_base_url}/artists/${args.id}/top-tracks?country=${
          args.country
        }`,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(options);
      const topTracks = result.tracks;

      return topTracks;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  artistAlbums: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error(
          "This endpoint requires authentication. Go to /signin to retrieve an access token."
        );
      }

      const options = {
        url: `${spotify_base_url}/artists/${args.id}/albums?market=${
          args.market
        }&include_groups=${args.include_groups}`,
        headers: {
          Authorization: "Bearer " + req.token
        }
      };

      const result = await request(options);
      const albums = result.items;

      return albums;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
};
