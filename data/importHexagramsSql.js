import Database from 'better-sqlite3'
import { hexagramsData } from './data.js'

const db = new Database('./iching.sqlite')

// Cria a tabela se não existir
db.exec(`DROP TABLE IF EXISTS hexagrams;`)

db.exec(`
  CREATE TABLE hexagrams (
    binary TEXT,
    lang TEXT DEFAULT 'en',
    name TEXT,
    name_zh TEXT,
    summary TEXT,
    judgment TEXT,
    image TEXT,
    line_1 TEXT,
    line_2 TEXT,
    line_3 TEXT,
    line_4 TEXT,
    line_5 TEXT,
    line_6 TEXT
  );
`)

const insert = db.prepare(`
  INSERT INTO hexagrams (
    binary, lang, name, name_zh, summary, judgment, image,
    line_1, line_2, line_3, line_4, line_5, line_6
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

for (const hex of hexagramsData) {
  const { binary, name, info: summary, details } = hex

  const judgment = details.judgment.join(' ')
  const image = details.image.join(' ')

  const lines = details.lines.map((line) => line.text.join(' '))

  while (lines.length < 6) lines.push('')

  insert.run(
    binary,
    'en',
    name,
    '', // name_zh
    summary,
    judgment,
    image,
    lines[0],
    lines[1],
    lines[2],
    lines[3],
    lines[4],
    lines[5]
  )
}

console.log('✔️ Todos os hexagramas foram inseridos com sucesso!')
