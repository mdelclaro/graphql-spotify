const { getRequest, postRequest } = require("../../utils/request");

module.exports = {
  myPlaylists: async (_, req) => {
    try {
      const result = await getRequest(req, "/me/playlists");
      return result.items;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  userPlaylists: async (args, req) => {
    try {
      const result = await getRequest(req, "/users/" + args.id + "/playlists");
      return result.items;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  playlist: async (args, req) => {
    try {
      const result = await getRequest(req, "/playlists/" + args.id);

      let tracks = [];
      result.tracks.items.map(item => {
        tracks.push(item);
      });
      result.tracks = tracks;

      return result;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  createPlaylist: async (args, req) => {
    try {
      const { name, public, collaborative, description } = args.playlistInput;
      const body = {
        name,
        public,
        collaborative,
        description
      };
      const url = `/users/${args.playlistInput.user_id}/playlists`;
      const params = { body, url, json: true };

      const result = await postRequest(req, params);

      let tracks = [];
      result.tracks.items.map(item => {
        tracks.push(item);
      });
      result.tracks = tracks;

      return result;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
};
