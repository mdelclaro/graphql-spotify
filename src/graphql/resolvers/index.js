const userResolver = require("./user");
const playlistResolver = require("./playlist");

const rootResolver = {
  ...userResolver,
  ...playlistResolver
};

module.exports = rootResolver;
