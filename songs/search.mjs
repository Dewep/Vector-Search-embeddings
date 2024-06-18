import { pipeline } from '@xenova/transformers'

const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')

const search = process.argv[2] || 'traveling to space, to find a new place'

console.log('USE search;')

const output = await extractor([search], { pooling: 'mean', normalize: true })
const embeds = '[' + output.data.map(nb => nb.toString()).join(',') + ']'
console.log(`SELECT song FROM songs ORDER BY cosineDistance(${embeds}, embeds) ASC LIMIT 1;`)
