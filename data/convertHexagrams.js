import Database from 'better-sqlite3'
import { hexagramsData } from './hexagrams/data.js'

const db = new Database('./db/iching.sqlite')

// Apaga e recria a tabela com a nova estrutura
db.exec(`DROP TABLE IF EXISTS hexagrams;`)

db.exec(`
  CREATE TABLE hexagrams (
    number INTEGER PRIMARY KEY,      -- 1 a 64
    binary TEXT UNIQUE,              -- Ex: "111111"
    name_chinese TEXT,               -- Ex: Ch'ien
    name_en TEXT,                    -- Ex: The Creative
    unicode_hexagram TEXT,           -- Ex: ䷀
    summary TEXT,
    judgment TEXT,                   -- JSON array
    image TEXT,                      -- JSON array
    line_1 TEXT,                     -- JSON array
    line_2 TEXT,
    line_3 TEXT,
    line_4 TEXT,
    line_5 TEXT,
    line_6 TEXT
  );
`)

// Função auxiliar para dividir o nome
function splitName(fullName) {
  const parts = fullName.split('/')
  const name_chinese = parts[0]?.trim()
  const name_en = parts[1]?.trim()
  return { name_chinese, name_en }
}

// Preparar o INSERT
const insert = db.prepare(`
  INSERT INTO hexagrams (
    number, binary, name_chinese, name_en, unicode_hexagram,
    summary, judgment, image,
    line_1, line_2, line_3, line_4, line_5, line_6
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

// Inserir os dados
for (const [i, hex] of hexagramsData.entries()) {
  const number = i + 1
  const { binary, name, info: summary, details, unicode } = hex
  const { name_chinese, name_en } = splitName(name)
  const unicode_hexagram = unicode || ''

  const judgment = JSON.stringify(details.judgment.map((line) => line.trim()))
  const image = JSON.stringify(details.image.map((line) => line.trim()))
  const lines = details.lines.map((lineObj) =>
    lineObj.text.map((verse) => verse.trim())
  )

  insert.run(
    number,
    binary,
    name_chinese,
    name_en,
    unicode_hexagram,
    summary,
    judgment,
    image,
    JSON.stringify(lines[0] || []),
    JSON.stringify(lines[1] || []),
    JSON.stringify(lines[2] || []),
    JSON.stringify(lines[3] || []),
    JSON.stringify(lines[4] || []),
    JSON.stringify(lines[5] || [])
  )
}

console.log('✅ Hexagramas inseridos com sucesso com a nova estrutura!')
