import db from './db.js'
//Data for List Table component

export const hexagramsNumbersList = [
  [1, 2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23, 24],
  [25, 26, 27, 28, 29, 30, 31, 32],
  [33, 34, 35, 36, 37, 38, 39, 40],
  [41, 42, 43, 44, 45, 46, 47, 48],
  [49, 50, 51, 52, 53, 54, 55, 56],
  [57, 58, 59, 60, 61, 62, 63, 64],
]
export const hexagramsSymbolsList = [
  ['䷀', '䷁', '䷂', '䷃', '䷄', '䷅', '䷆', '䷇'],
  ['䷈', '䷉', '䷊', '䷋', '䷌', '䷍', '䷎', '䷏'],
  ['䷐', '䷑', '䷒', '䷓', '䷔', '䷕', '䷖', '䷗'],
  ['䷘', '䷙', '䷚', '䷛', '䷜', '䷝', '䷞', '䷟'],
  ['䷠', '䷡', '䷢', '䷣', '䷤', '䷥', '䷦', '䷧'],
  ['䷨', '䷩', '䷪', '䷫', '䷬', '䷭', '䷮', '䷯'],
  ['䷰', '䷱', '䷲', '䷳', '䷴', '䷵', '䷶', '䷷'],
  ['䷸', '䷹', '䷺', '䷻', '䷼', '䷽', '䷾', '䷿'],
]

export const hexagramsEnglishList = [
  [
    'The Creative',
    'The Receptive',
    'Difficulty at the Beginning',
    'Youthful Folly',
    'Waiting',
    'Conflict',
    'The Army',
    'Increase',
  ],
  [
    'The Taming Power of the Great',
    'The Arousing Thunder',
    'Difficulty at the Beginning',
    'Nourishment',
    'Return',
    'Increase',
    'Biting Through',
    'Following',
  ],
  [
    'Conflict',
    'Deliverance',
    'The Abysmal Water',
    'Youthful Folly',
    'The Army',
    'Dispersion',
    'Before Completion',
    'Oppression',
  ],
  [
    'Retreat',
    'Small Exceeding',
    'Obstruction',
    'Keeping Still',
    'Modesty',
    'Development',
    'The Wanderer',
    'Influence',
  ],
  [
    'Stagnation',
    'Enthusiasm',
    'Holding Together',
    'Splitting Apart',
    'The Receptive',
    'Contemplation',
    'Progress',
    'Gathering Together',
  ],
  [
    'Meeting',
    'Duration',
    'The Well',
    'Work on What Has Been Spoiled',
    'Pushing Upward',
    'The Gentle Wind',
    'The Cauldron',
    'Preponderance of the Great',
  ],
  [
    'Fellowship with Men',
    'Abundance',
    'After Completion',
    'Grace',
    'Darkening of the Light',
    'The Family',
    'The Clinging',
    'Revolution',
  ],
  [
    'Treading',
    'Marrying Maiden',
    'Inner Truth',
    'Approach',
    'Decrease',
    'Articulating',
    'Opposition',
    'Joy',
  ],
]

//Data for Reference Table component

export const trigramsSymbolsReference = [
  '☰',
  '☳',
  '☵',
  '☶',
  '☷',
  '☴',
  '☲',
  '☱',
]
export const trigramsChineseReference = [
  "Ch'ien",
  'Chen',
  "K'an",
  'Ken',
  'Kun',
  'Sun',
  'Li',
  'Tui',
]
export const trigramsEnglishReference = [
  'Heaven',
  'Thunder',
  'Water',
  'Mountain',
  'Earth',
  'Wind',
  'Flame',
  'Lake',
]

export const hexagramsNumbersReference = [
  [1, 34, 5, 26, 11, 9, 14, 43],
  [25, 51, 3, 27, 24, 42, 21, 17],
  [6, 40, 29, 4, 7, 59, 64, 47],
  [33, 62, 39, 52, 15, 53, 56, 31],
  [12, 16, 8, 23, 2, 20, 35, 45],
  [44, 32, 48, 18, 46, 57, 50, 28],
  [13, 55, 63, 22, 36, 37, 30, 49],
  [10, 54, 61, 19, 41, 60, 38, 58],
]

export const hexagramsSymbolsReference = [
  ['䷀', '䷡', '䷄', '䷙', '䷊', '䷈', '䷍', '䷪'],
  ['䷘', '䷲', '䷂', '䷚', '䷗', '䷩', '䷔', '䷐'],
  ['䷅', '䷧', '䷜', '䷃', '䷆', '䷺', '䷿', '䷮'],
  ['䷠', '䷽', '䷦', '䷳', '䷎', '䷴', '䷷', '䷞'],
  ['䷋', '䷏', '䷦', '䷖', '䷁', '䷓', '䷢', '䷬'],
  ['䷫', '䷟', '䷯', '䷑', '䷭', '䷸', '䷱', '䷛'],
  ['䷌', '䷶', '䷾', '䷕', '䷣', '䷤', '䷝', '䷰'],
  ['䷉', '䷵', '䷼', '䷒', '䷨', '䷻', '䷥', '䷹'],
]

export const hexagramsEnglishReference = [
  [
    'The Creative',
    'The Power of the Great',
    'Waiting',
    'The Taming Power of the Great',
    'Peace',
    'The Taming Power of the Small',
    'Possession in Great Measure',
    'Breakthrough',
  ],
  [
    'Innocence',
    'The Arousing',
    'Difficulty at the Beginning',
    'The Corners of the Mouth',
    'Return',
    'Increase',
    'Biting Through',
    'Following',
  ],
  [
    'Conflict',
    'Deliverance',
    'The Abysmal',
    'Youthful Folly',
    'The Army',
    'Dispersion',
    'Before Completion',
    'Oppression',
  ],
  [
    'Retreat',
    'Preponderance of the Small',
    'Obstruction',
    'Keeping Still',
    'Modesty',
    'Development',
    'The Wanderer',
    'Influence',
  ],
  [
    'Standstill',
    'Enthusiasm',
    'Holding Together',
    'Splitting Apart',
    'The Receptive',
    'Contemplation',
    'Progress',
    'Gathering Together',
  ],
  [
    'Coming to Meet',
    'Duration',
    'The Well',
    'Work on the Decayed',
    'Pushing Upward',
    'The Gentle',
    'The Cauldron',
    'Preponderance of the Great',
  ],
  [
    'Fellowship with Men',
    'Abundance',
    'After Completion',
    'Grace',
    'Darkening of the Light',
    'The Family',
    'Clinging',
    'Revolution',
  ],
  [
    'Treading',
    'The Marrying Maiden',
    'Inner Truth',
    'Approach',
    'Decrease',
    'Limitation',
    'Opposition',
    'The Joyous',
  ],
]

// Criar arrays para inserção:

const hexagramListData = []
for (let row = 0; row < hexagramsNumbersList.length; row++) {
  for (let col = 0; col < hexagramsNumbersList[row].length; col++) {
    hexagramListData.push({
      number: hexagramsNumbersList[row][col],
      unicode: hexagramsSymbolsList[row][col],
      english_name: hexagramsEnglishList[row][col],
      chinese_name: null,
      trigram_upper_unicode: null,
      trigram_upper_name: null,
      trigram_lower_unicode: null,
      trigram_lower_name: null,
      description: null,
    })
  }
}

const hexagramReferenceData = []
for (let row = 0; row < hexagramsNumbersReference.length; row++) {
  for (let col = 0; col < hexagramsNumbersReference[row].length; col++) {
    hexagramReferenceData.push({
      number: hexagramsNumbersReference[row][col],
      unicode: hexagramsSymbolsReference[row][col],
      english_name: hexagramsEnglishReference[row][col],
      chinese_name: null,
      trigram_upper_unicode: null,
      trigram_upper_name: null,
      trigram_lower_unicode: null,
      trigram_lower_name: null,
      description: null,
    })
  }
}

const trigramReferenceData = []
for (let i = 0; i < trigramsSymbolsReference.length; i++) {
  trigramReferenceData.push({
    unicode: trigramsSymbolsReference[i],
    chinese_name: trigramsChineseReference[i],
    english_name: trigramsEnglishReference[i],
  })
}

// Inserção na base

const insertHexagramList = db.prepare(`
  INSERT INTO hexagram_list
  (number, unicode, english_name, chinese_name, trigram_upper_unicode, trigram_upper_name, trigram_lower_unicode, trigram_lower_name, description)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

const insertHexagramReference = db.prepare(`
  INSERT INTO hexagram_reference
  (number, unicode, english_name, chinese_name, trigram_upper_unicode, trigram_upper_name, trigram_lower_unicode, trigram_lower_name)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`)

const insertTrigramReference = db.prepare(`
  INSERT INTO trigram_reference
  (unicode, chinese_name, english_name)
  VALUES (?, ?, ?)
`)

// Usar transaction para inserção em lote

const insertAll = db.transaction(() => {
  db.prepare('DELETE FROM hexagram_list').run()
  db.prepare('DELETE FROM hexagram_reference').run()
  db.prepare('DELETE FROM trigram_reference').run()

  for (const hex of hexagramListData) {
    insertHexagramList.run(
      hex.number,
      hex.unicode,
      hex.english_name,
      hex.chinese_name,
      hex.trigram_upper_unicode,
      hex.trigram_upper_name,
      hex.trigram_lower_unicode,
      hex.trigram_lower_name,
      hex.description
    )
  }

  for (const hex of hexagramReferenceData) {
    insertHexagramReference.run(
      hex.number,
      hex.unicode,
      hex.english_name,
      hex.chinese_name,
      hex.trigram_upper_unicode,
      hex.trigram_upper_name,
      hex.trigram_lower_unicode,
      hex.trigram_lower_name
    )
  }

  for (const tri of trigramReferenceData) {
    insertTrigramReference.run(tri.unicode, tri.chinese_name, tri.english_name)
  }
})

insertAll()

console.log('Dados inseridos com sucesso!')
