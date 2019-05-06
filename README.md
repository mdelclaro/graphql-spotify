# Spotify GraphQL API
This project wraps the Spotify's Web API with a GraphQL API. To see more details about the API, such as request parameters etc, visit its [reference](https://developer.spotify.com/documentation/web-api/reference/).

Feel free to contribute and implement missing methods or give any suggestion!

# The API
## Auth

In order to retrieve the auth data, go to `http://<server>:<port>/login` and perform the OAuth login. The response: 

+ Response 200 (application/json)
    + Attributes (object)
        + access_token: `"xxx"` (string)
        + refresh_token: `"xxx"` (string)
        + token_type: `"Bearer"` (string)
        + expires_in: `3600` (int)
        + scope: `"user-read-email user-read-private"` (string)

Add the access_token to the Authorization header of the requests. Example: `"Authorization": "Bearer <access_token>"`

To refresh the token, perform a `POST` request on `http://<server>:<port>/refresh_token` with the `refresh_token` on the body:

+ Body (object)
    + refresh_token: `"xxx"` (string)

+ Request (application/json)

+ Response 200 (application/json)
    + Attributes (object)
        + access_token: `"xxx"` (string)
        + token_type: `"Bearer"` (string)
        + expires_in: `3600` (int)
        + scope: `"user-read-email user-read-private"` (string)


## Types

```js
type PrivateUser {
  id: String
  country: String
  display_name: String
  email: String
  href: String
  images: [Image]
  product: String
  uri: String
}

type PublicUser {
  id: ID
  display_name: String
  href: String
  uri: String
  playlists: [Playlist]
  images: [Image]
}

type Track {
  id: ID
  album: Album
  artists: [Artist]
  available_markets: [String]
  disc_number: Int
  duration_ms: Int
  explicit: Boolean
  href: String
  is_playable: Boolean
  name: String
  popularity: Int
  preview_url: String
  track_number: Int
  type: String
  uri: String
}

type Album {
  id: ID
  album_type: String
  artists: [Artist]
  available_markets: [String]
  genres: [String]
  href: String
  images: [Image]
  label: String
  name: String
  popularity: Int
  release_date: String
  release_date_precision: String
  tracks: [Track]
  type: String
  uri: String
}

type Artist {
  id: ID
  genres: [String]
  href: String
  images: [Image]
  name: String
  popularity: Int
  type: String
  uri: String
}

type Playlist {
  id: ID
  collaborative: Boolean
  description: String
  href: String
  images: [Image]
  name: String
  owner: PublicUser
  uri: String
  tracks: [PlaylistTrack]
  public: Boolean
}

type Playlists {
  id: ID
  collaborative: Boolean
  description: String
  href: String
  images: [Image]
  name: String
  owner: PublicUser
  uri: String
  tracks: PlaylistsTrack
  public: Boolean
}

type PlaylistsTrack {
  href: String
  total: Int
}

type PlaylistTrack {
  added_at: String
  added_by: String
  track: Track
}

type Image {
  height: Int
  url: String
  width: Int
}
```

## Queries

```js
type RootQuery {
  me: PrivateUser
  user(id: String!): PublicUser
  track(id: String!): Track
  tracks(ids: String!): [Track]
  artist(id: String, name: String): Artist
  artists(ids: String!): [Artist]
  artistTopTracks(id: String!, country: String!): [Track]
  artistAlbums(id: String!, market: String, include_groups: String): [Album]
  album(id: String!): Album
  albums(ids: String!): [Album]
  playlist(id: String!): Playlist
  userPlaylists(id: String!): [Playlists]
  myPlaylists: [Playlists]
  }
```

## Queries examples

### User

```js
// Get current user
query {
  me {
    id
    display_name
  }
}

// Get user by ID
query {
  user(id: "12144136536") {
    display_name
  }
}
```

### Playlist

```js
// Get current user's playlists
query {
  myPlaylists {
    name
  }
}

// Get an user's playlists
query {
  userPlaylists(id: "12144136536") {
    name
  }
}
```

### Track
```js
// Get a track
query {
  track(id:"7JSHs5GH7pq5moVo8wu1I6") {
    name 
  }
}

// Get several tracks
query {
  tracks(ids:"7JSHs5GH7pq5moVo8wu1I6,119c93MHjrDLJTApCVGpvx") {
    name 
  }
}

```

### Artist
```js
// Get an artist
query {
  artist(id: "34EP7KEpOjXcM2TCat1ISk") {
    name
  }
}
// Get several artists
query {
  artists(ids: "34EP7KEpOjXcM2TCat1ISk,03r4iKL2g2442PT9n2UKsx") {
    name
    genres
  }
}

// Get an artist's top tracks
query {
  artistTopTracks(id: "6P7H3ai06vU1sGvdpBwDmE", country: "BR") {
    name
  }
}

// Get an artist's albums
query {
  artistAlbums(id: "6P7H3ai06vU1sGvdpBwDmE", market: "BR", include_groups:"album") {
    name
  }
}

```
