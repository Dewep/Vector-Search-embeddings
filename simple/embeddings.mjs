// yarn add @xenova/transformers
import { pipeline } from '@xenova/transformers'

const sentence = process.argv[2] || 'My cat is used to sleeping on the bed during the day.'

const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
const output = await extractor([sentence], { pooling: 'mean', normalize: true })

console.log(output.data)
// Float32Array(384) [0.09880723804235458, -0.0015220436034724116, 0.029922883957624435, ...]
