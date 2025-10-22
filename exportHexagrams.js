// exportHexagrams.js
const Database = require('better-sqlite3')
const fs = require('fs')
const path = require('path')

const dbPath = path.resolve('./data/db/iching.sqlite')
const db = new Database(dbPath)

const hexagrams = db.prepare('SELECT * FROM hexagrams').all()

fs.writeFileSync('hexagrams.json', JSON.stringify(hexagrams, null, 2))
console.log(`Exported ${hexagrams.length} hexagrams to hexagrams.json`)
