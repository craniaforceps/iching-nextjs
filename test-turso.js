// test-turso.js
import db from './data/db/adapter.js' // garante que termina com .js

async function testTurso() {
  try {
    console.log('Testando conexão com Turso...')

    // Tenta inserir um utilizador de teste
    const res = await db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      ['teste@exemplo.com', '123456']
    )
    console.log('Insert feito:', res)

    // Busca o utilizador que acabamos de inserir
    const user = await db.get('SELECT * FROM users WHERE email = ?', [
      'teste@exemplo.com',
    ])
    console.log('Usuário encontrado:', user)

    // Limpa inserção de teste
    await db.run('DELETE FROM users WHERE email = ?', ['teste@exemplo.com'])
    console.log('Teste limpo com sucesso!')
  } catch (err) {
    console.error('Erro ao testar Turso:', err)
  }
}

testTurso()
