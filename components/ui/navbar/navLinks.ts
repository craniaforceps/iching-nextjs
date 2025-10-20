// navLinks.ts
import { LinkItem, NavItem } from './types'

// Links comuns a todos os utilizadores
export const baseLinks: LinkItem[] = [
  { type: 'link', href: '/', label: 'Início' },
  { type: 'link', href: '/sobre', label: 'Sobre' },
  { type: 'link', href: '/tabelas', label: 'Tabelas' },
]

// Links auth / not auth
export const authNavLinks: NavItem[] = [
  { type: 'link', href: '/dashboard', label: 'Dashboard' },
  { type: 'action', label: 'Logout', onClick: () => {} }, // substituir pelo handleLogout
]

export const notAuthNavLinks: NavItem[] = [
  { type: 'link', href: '/login', label: 'Login' },
  { type: 'link', href: '/registo', label: 'Registo' },
]
