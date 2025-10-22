// scripts/migrateHexagrams.ts
import Database from 'better-sqlite3'
import { createClient } from '@libsql/client'
import dotenv from 'dotenv'
dotenv.config()

type HexagramRow = {
  number: number
  binary: string
  name_chinese: string
  name_en: string
  unicode_hexagram: string
  summary: string
  judgment: string | any[]
  image: string | any[]
  line_1: string | any[]
  line_2: string | any[]
  line_3: string | any[]
  line_4: string | any[]
  line_5: string | any[]
  line_6: string | any[]
}

// --- Setup SQLite local
const sqlite = new Database('./data/db/iching.sqlite')

// --- Setup Turso
if (!process.env.TURSO_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw new Error('TURSO_URL e TURSO_AUTH_TOKEN obrigatórios no .env')
}

const turso = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function migrateHexagrams() {
  // Lê todos os hexagramas
  const rows = sqlite.prepare('SELECT * FROM hexagrams').all() as HexagramRow[]

  console.log(`Encontrados ${rows.length} hexagramas na DB local.`)

  for (const row of rows) {
    // Garantir que campos JSON são strings
    const judgment =
      typeof row.judgment === 'string'
        ? row.judgment
        : JSON.stringify(row.judgment)
    const image =
      typeof row.image === 'string' ? row.image : JSON.stringify(row.image)
    const line_1 =
      typeof row.line_1 === 'string' ? row.line_1 : JSON.stringify(row.line_1)
    const line_2 =
      typeof row.line_2 === 'string' ? row.line_2 : JSON.stringify(row.line_2)
    const line_3 =
      typeof row.line_3 === 'string' ? row.line_3 : JSON.stringify(row.line_3)
    const line_4 =
      typeof row.line_4 === 'string' ? row.line_4 : JSON.stringify(row.line_4)
    const line_5 =
      typeof row.line_5 === 'string' ? row.line_5 : JSON.stringify(row.line_5)
    const line_6 =
      typeof row.line_6 === 'string' ? row.line_6 : JSON.stringify(row.line_6)

    // Inserção em Turso
    await turso.execute({
      sql: `
        INSERT INTO hexagrams (
          number, binary, name_chinese, name_en, unicode_hexagram, summary,
          judgment, image, line_1, line_2, line_3, line_4, line_5, line_6
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        row.number,
        row.binary,
        row.name_chinese,
        row.name_en,
        row.unicode_hexagram,
        row.summary,
        judgment,
        image,
        line_1,
        line_2,
        line_3,
        line_4,
        line_5,
        line_6,
      ],
    })
    console.log(`Migrado hexagrama #${row.number}`)
  }

  console.log('Migração completa!')
}

// Executa
migrateHexagrams().catch((err) => {
  console.error('Erro durante a migração:', err)
})
