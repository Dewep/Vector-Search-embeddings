# Songs demo

Download `spotify_millsongdata.csv` file from https://www.kaggle.com/datasets/notshrirang/spotify-million-song-dataset

Generate a JSON containing 1k random songs from it:

```sh
$> node find-songs.js
```

To create a ClickHouse database container:

```sh
$ docker run -d --name ch clickhouse/clickhouse-server
```

Generate database content from the generated `songs.json` file:

```sh
$> node generate.mjs | docker exec -i ch clickhouse-client --multiline --multiquery
```

Find the best song from a text search:

```sh
$> node search.mjs "traveling to space, to find a new place" | docker exec -i ch clickhouse-client --multiline --multiquery
Exodus - Boney M.
```