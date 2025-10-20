// scripts/listServerClient.js
const fs = require('fs')
const path = require('path')

// Pastas comuns em Next 15
const DIRS = ['app', 'components', 'lib']

const clientFiles = []
const serverFiles = []

function walk(dir) {
  if (!fs.existsSync(dir)) return // evita ENOENT

  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      walk(fullPath)
    } else if (/\.(tsx?|jsx?)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf-8')
      if (content.includes("'use client'")) {
        clientFiles.push(fullPath)
      } else {
        serverFiles.push(fullPath)
      }
    }
  }
}

// Percorre todas as pastas
DIRS.forEach((dir) => walk(path.join(__dirname, '../' + dir)))

// Escreve os ficheiros na raiz
fs.writeFileSync('client_components.txt', clientFiles.join('\n'))
fs.writeFileSync('server_components.txt', serverFiles.join('\n'))

console.log('✅ Listagem completa. Arquivos gerados:')
console.log(' - client_components.txt')
console.log(' - server_components.txt')
console.log(`Client Components encontrados: ${clientFiles.length}`)
console.log(`Server Components encontrados: ${serverFiles.length}`)
