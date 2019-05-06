const userResolver = require("./user");
const playlistResolver = require("./playlist");
const trackResolver = require("./track");

const rootResolver = {
  ...userResolver,
  ...playlistResolver,
  ...trackResolver
};

module.exports = rootResolver;
