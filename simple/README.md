# Simple demo

To generate embeddings (Array of floats):

```sh
$> node embeddings.mjs "My cat is used to sleeping on the bed during the day."
```

To create a ClickHouse database container:

```sh
$ docker run -d --name ch clickhouse/clickhouse-server
```

To generate some content in the database:

```sh
$> node demo.mjs | docker exec -i ch clickhouse-client --multiline --multiquery
```

To perform a search in the database:

```sh
$> node demo.mjs "kittens and puppies" | docker exec -i ch clickhouse-client --multiline --multiquery
```
