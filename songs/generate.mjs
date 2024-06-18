import { pipeline } from '@xenova/transformers'
import { read } from 'fs'
import { readFile } from 'fs/promises'

const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')

console.log('DROP DATABASE IF EXISTS search;')
console.log('CREATE DATABASE search;')
console.log('USE search;')
console.log('CREATE TABLE songs (`song` String, `embeds` Array(Float32)) ENGINE = MergeTree ORDER BY song;')

const songs = JSON.parse(await readFile('./dataset/songs.json'))

for (const song of songs) {
  const output = await extractor(song.lyrics, { pooling: 'mean', normalize: true })
  const embeds = '[' + output.data.map(nb => nb.toString()).join(',') + ']'
  const name = (song.song + ' - ' + song.artist).replace(/'/g, '\\\'')
  console.log(`INSERT INTO songs (song, embeds) VALUES ('${name}', ${embeds});`)
}
