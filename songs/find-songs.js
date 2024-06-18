const { readFileSync, writeFileSync } = require('fs')
const csv = require('csv/sync')

// read & parse CSV dataset
const csvContent = readFileSync('./spotify_millsongdata.csv')
const records = csv.parse(csvContent, { bom: true })

// remove header
records.shift()

// shuffle songs
const shuffled = records
  .map(([artist, song, link, text]) => ({
    artist,
    song,
    lyrics: text
      .split(/\n/) // Split lyrics per line
      .map(line => line.trim()) // Remove extra whitespaces
      .filter(line => line) // Remove empty lines
      .join(' '), // concat lyrics again
    sort: Math.random(),
  }))
  .sort((a, b) => a.sort - b.sort)

// only keep the first 1000 songs
const songs = shuffled.slice(0, 1000)

// save to JSON file
writeFileSync('./songs.json', JSON.stringify(songs, null, 2))
