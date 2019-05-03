const { assert } = require("chai");

const checkAuth = require("../src/utils/checkAuth");
const SpotifyApi = require("../src/lib/client");

describe("Check API Auth", () => {
  it("should return an error if api was not initialized", done => {
    checkAuth(() => {})
      .then(() => {
        done(new Error("Expected method to reject."));
      })
      .catch(err => {
        assert.isDefined(err);
        done();
      });
  });

  it("should resolve if api was initialized", done => {
    SpotifyApi.init("", "", 60);
    checkAuth(() => {})
      .then(() => {
        done();
      })
      .catch(err => {
        done(new Error("Expected method to resolve."));
      });
  });
});
