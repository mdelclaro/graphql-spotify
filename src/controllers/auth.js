const querystring = require("querystring");
const request = require("request");
const {
  spotify_client_id,
  spotify_client_secret,
  redirect_uri,
  frontend_uri
} = require("../config");

const SpotifyApi = require("../lib/client");

exports.login = (req, res) => {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: spotify_client_id,
        scope: "user-read-private user-read-email",
        redirect_uri
      })
  );
};

exports.callback = (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code,
      redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        )
    },
    json: true,
    followAllRedirects: true
  };

  request.post(authOptions, (err, response, body) => {
    const { access_token, refresh_token, expires_in } = body;
    SpotifyApi.init(access_token, refresh_token, expires_in);
    res.send("You are now authenticaded and can use the GraphQL API.");
    // res.redirect(frontend_uri + "?access_token=" + access_token);
  });
};
