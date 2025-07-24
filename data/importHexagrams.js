import Database from 'better-sqlite3'
import oldHexagramData from './legacy/oldHexagramData.js'
const { book1Info } = oldHexagramData

const db = new Database('iching.sqlite')

// Criar tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS hexagrams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number INTEGER UNIQUE,
    name_en TEXT,
    name_zh TEXT,
    name_pt TEXT,
    unicode TEXT,
    binary TEXT,
    info TEXT
  );

  CREATE TABLE IF NOT EXISTS lines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hexagram_number INTEGER,
    line_position TEXT,
    line_text TEXT,
    FOREIGN KEY(hexagram_number) REFERENCES hexagrams(number)
  );
`)

// Exemplo do teu array, só com 1 hexagrama para simplificar

// Inserir hexagramas
const insertHexagram = db.prepare(`
  INSERT OR IGNORE INTO hexagrams (number, name_en, unicode, binary, info)
  VALUES (?, ?, ?, ?, ?)
`)

// Inserir linhas
const insertLine = db.prepare(`
  INSERT INTO lines (hexagram_number, line_position, line_text)
  VALUES (?, ?, ?)
`)

for (const hex of book1Info) {
  insertHexagram.run(hex.number, hex.name, hex.unicode, hex.binary, hex.info)

  // Para cada linha no objeto lineNumber
  for (const [lineKey, texts] of Object.entries(hex.lineNumber)) {
    for (const text of texts) {
      insertLine.run(hex.number, lineKey, text)
    }
  }
}

console.log('Dados inseridos com sucesso!')
