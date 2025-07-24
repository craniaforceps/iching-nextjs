import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.resolve(process.cwd(), 'data/db/iching.sqlite')
console.log('📂 DB Path (corrigido):', dbPath)

const db = new Database(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS readings (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    notes TEXT,
    createdAt TEXT NOT NULL,
    originalHexagram TEXT NOT NULL,
    mutantHexagram TEXT NOT NULL
  );
`)

export default db
