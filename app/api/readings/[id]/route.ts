// Next
import { NextRequest, NextResponse } from 'next/server'

// Helpers
import { loadReadings, saveReadings } from '@/lib/api/readings'
import { extractIdFromRequest } from '@/lib/api/helpers'

// Types
import type { Reading } from '@/types/hexagram' //

// DELETE /api/readings/:id

/**
 * Handler para o método HTTP DELETE.
 * Remove a leitura com o `id` fornecido.
 * @param request - objeto NextRequest da API
 */
export async function DELETE(request: NextRequest) {
  const id = extractIdFromRequest(request) // extrai o id da URL
  if (!id) {
    // se não existir id
    // responde com erro 400 - bad request
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  try {
    const readings: Reading[] = loadReadings() // carrega todas as leituras do JSON
    // filtra para manter só leituras cujo id é diferente do recebido (remove o que tem id)
    const filtered = readings.filter((reading) => reading.id !== id)
    saveReadings(filtered) // grava o array atualizado no JSON

    // resposta de sucesso
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    // caso haja erro na leitura/escrita do ficheiro, retorna erro 500
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    return NextResponse.json({ error }, { status: 500 })
  }
}

// PUT /api/readings/:id

/**
 * Handler para o método HTTP PUT.
 * Atualiza a leitura com o `id` fornecido usando os dados do body JSON.
 * @param request - objeto NextRequest da API
 */
export async function PUT(request: NextRequest) {
  const id = extractIdFromRequest(request) // extrai o id da URL
  if (!id) {
    // se não existir id
    // responde com erro 400 - bad request
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  try {
    const patch: Partial<Reading> = await request.json() // lê o corpo JSON da requisição com os dados para atualizar
    const list: Reading[] = loadReadings() // carrega todas as leituras
    const idx = list.findIndex((reading) => reading.id === id) // procura o índice da leitura com o id dado

    if (idx === -1) {
      // se não encontrou a leitura
      // retorna erro 404 - not found
      return NextResponse.json({ error: 'Reading not found' }, { status: 404 })
    }

    // atualiza a leitura com os novos dados, preservando o resto dos campos
    list[idx] = { ...list[idx], ...patch }
    saveReadings(list) // salva a lista atualizada no ficheiro JSON

    // retorna sucesso e a leitura atualizada
    return NextResponse.json({ success: true, reading: list[idx] })
  } catch (err: unknown) {
    // caso erro geral, retorna erro 500
    const error = err instanceof Error ? err.message : 'Erro desconhecido'
    return NextResponse.json({ error }, { status: 500 })
  }
}
