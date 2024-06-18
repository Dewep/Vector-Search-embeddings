import { pipeline } from '@xenova/transformers'

const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')

if (process.argv[2]) {
  console.log('USE search;')

  const output = await extractor([process.argv[2]], { pooling: 'mean', normalize: true })
  const embeds = '[' + output.data.map(nb => nb.toString()).join(',') + ']'
  console.log(`SELECT floor(cosineDistance(${embeds}, embeds), 2) AS score, text FROM vector_test ORDER BY score ASC LIMIT 5;`)
  process.exit(0)
}

console.log('DROP DATABASE IF EXISTS search;')
console.log('CREATE DATABASE search;')
console.log('USE search;')
console.log('CREATE TABLE vector_test (`text` String, `embeds` Array(Float32)) ENGINE = MergeTree ORDER BY text;')

const documents = [
  'Some cats are playing in my flat.',
  'I would like one day to have a dog, a pomsky.',
  'My job is to create web applications.',
  'I love to read books in my free time.',
  'The capital of France is Paris, I think.',
  'Every morning, I take a walk in the park.',
  'My favorite food is Italian cuisine, really.',
  'I have a big family, with five sisters.',
  'The weather is nice today, really sunny.',
  'I am a morning person, always early.',
  'In my opinion, the best movie is Iron Man.',
  'I am not good at singing, unfortunately.',
  'My favorite sport is soccer, always exciting.',
  'I love to play video games, especially strategy ones.',
  'In my country, the official language is French.',
  'I have a pet rabbit, his name is Fluffy.',
  'I like to travel, especially to the beach.',
  'I am a fan of the band Coldplay, always inspiring.',
  'I have a big garden, with many vegetables.',
  'I am not good at cooking, unfortunately.',
  'My favorite holiday is Christmas, always joyful.',
  'I like to write stories, especially science fiction ones.',
  'I am a fan of the actress Emma Stone, always charming.',
  'I like to play chess, always challenging.',
  'My favorite season is spring, always beautiful.',
  'I am not good at dancing, unfortunately.',
  'My favorite musician is Ed Sheeran, always talented.',
  'I like to read news, especially about technology.',
  'My favorite car is Tesla, innovative.',
  'I am a fan of the football team Barcelona.',
  'I like to play tennis, I played multiple tournaments.',
  'My favorite food is sushi.',
  'I have a big house, with many rooms.',
  'I am not good at swimming, unfortunately.',
]

for (const doc of documents) {
  const output = await extractor([doc], { pooling: 'mean', normalize: true })
  const embeds = '[' + output.data.map(nb => nb.toString()).join(',') + ']'
  console.log(`INSERT INTO vector_test (text, embeds) VALUES ('${doc}', ${embeds});`)
}
