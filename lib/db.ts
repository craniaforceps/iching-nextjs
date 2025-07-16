import Database from 'better-sqlite3'

const db = new Database('./data/iching.sqlite') // Caminho relativo

export default db
