// data/db/adapter.ts
import { createClient } from '@libsql/client'
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Adapter universal: funciona tanto em ambiente local (SQLite)
 * como em produção (Turso/libSQL).
 *
 * Métodos disponíveis:
 *  - get(sql, params?)
 *  - all(sql, params?)
 *  - run(sql, params?)
 */

// Detecta ambiente — usa NODE_ENV (mais fiável que apenas TURSO_URL)
const isProd = process.env.NODE_ENV === 'production'

// --- SQLITE LOCAL ---
function createLocalAdapter() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const dbPath = path.resolve(__dirname, 'iching.sqlite')

  const sqlite = new Database(dbPath)

  console.log('🧱 Usando base de dados local:', dbPath)

  return {
    async get<T = any>(sql: string, params?: any[]) {
      return sqlite.prepare(sql).get(params) as T
    },
    async all<T = any>(sql: string, params?: any[]) {
      return sqlite.prepare(sql).all(params) as T[]
    },
    async run(sql: string, params?: any[]) {
      return sqlite.prepare(sql).run(params)
    },
  }
}

// --- TURSO (produção) ---
function createTursoAdapter() {
  const { TURSO_URL, TURSO_AUTH_TOKEN } = process.env
  if (!TURSO_URL || !TURSO_AUTH_TOKEN) {
    throw new Error(
      '⚠️ TURSO_URL e TURSO_AUTH_TOKEN são obrigatórios em produção.'
    )
  }

  console.log('🌐 Conectando à base de dados Turso:', TURSO_URL)

  const client = createClient({ url: TURSO_URL, authToken: TURSO_AUTH_TOKEN })

  return {
    async get<T = any>(sql: string, params?: any[]) {
      const res = await client.execute({ sql, args: params })
      return res.rows[0] as T
    },
    async all<T = any>(sql: string, params?: any[]) {
      const res = await client.execute({ sql, args: params })
      return res.rows as T[]
    },
    async run(sql: string, params?: any[]) {
      const res = await client.execute({ sql, args: params })
      return res
    },
  }
}

// --- Exporta automaticamente o adapter correto ---
const db = isProd ? createTursoAdapter() : createLocalAdapter()
export default db
