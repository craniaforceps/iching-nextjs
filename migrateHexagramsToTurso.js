// migrateHexagramsToTurso.js
import { createClient } from '@libsql/client'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

// Caminho do JSON exportado
const hexagramFile = path.resolve('./hexagrams.json')
const hexagrams = JSON.parse(fs.readFileSync(hexagramFile, 'utf-8'))

// Cria cliente Turso
const client = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function migrate() {
  for (const h of hexagrams) {
    try {
      await client.execute({
        sql: `
          INSERT INTO hexagrams (
            number, binary, name_chinese, name_en, unicode_hexagram,
            summary, judgment, image, line_1, line_2, line_3, line_4, line_5, line_6
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          h.number,
          h.binary,
          h.name_chinese,
          h.name_en,
          h.unicode_hexagram,
          h.summary,
          h.judgment,
          h.image,
          h.line_1,
          h.line_2,
          h.line_3,
          h.line_4,
          h.line_5,
          h.line_6,
        ],
      })
      console.log(`Inserted hexagram ${h.number}`)
    } catch (err) {
      console.error(`Error inserting hexagram ${h.number}:`, err)
    }
  }
  console.log('Migration complete!')
}

migrate()
