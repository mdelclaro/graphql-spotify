const userResolver = require("./user");
const playlistResolver = require("./playlist");
const trackResolver = require("./track");
const artistResolver = require("./artist");

const rootResolver = {
  ...userResolver,
  ...playlistResolver,
  ...trackResolver,
  ...artistResolver
};

module.exports = rootResolver;
