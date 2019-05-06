const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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
    followers: Followers
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

  type Followers {
    href: String
    total: Int
  }

  type MyTopTracks {
    tracks: [Track]
  }
  
  type MyTopArtists {
    artists: [Artist]
  }

  type RootQuery {
    me: PrivateUser
    user(id: String!): PublicUser
    myTopTracks(time_range: String): MyTopTracks
    myTopArtists(time_range: String): MyTopArtists
    track(id: String!): Track
    tracks(ids: String!): [Track]
    artist(id: String!): Artist
    artists(ids: String!): [Artist]
    artistTopTracks(id: String!, country: String!): [Track]
    artistAlbums(id: String!, market: String, include_groups: String): [Album]
    artistRelated(id: String!): [Artist]
    album(id: String!): Album
    albums(ids: String!): [Album]
    albumTracks(id: String!): [Track]
    playlist(id: String!): Playlist
    userPlaylists(id: String!): [Playlists]
    myPlaylists: [Playlists]
  }

  schema {
    query: RootQuery
  }
`);
