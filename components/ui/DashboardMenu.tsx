// components/ui/DashboardMenu.tsx
import Link from 'next/link'

export default function DashboardMenu() {
  return (
    <nav className="bg-white dark:bg-stone-600 shadow rounded-lg p-4">
      <ul>
        <li>
          <Link href="/leituras">
            <a className="text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400">
              Leituras
            </a>
          </Link>
        </li>
        <li>
          <Link href="/arquivo">
            <a className="text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400">
              Arquivo
            </a>
          </Link>
        </li>
        <li>
          <Link href="/tabelas">
            <a className="text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400">
              Tabelas
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
