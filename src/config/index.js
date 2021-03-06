require("dotenv-safe").config();

module.exports = {
  spotify_client_id: process.env.SPOTIFY_CLIENT_ID,
  spotify_client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  spotify_base_url: process.env.SPOTIFY_BASE_URL,
  redirect_uri: process.env.REDIRECT_URI,
  frontend_uri: process.env.FRONTEND_URI
};
