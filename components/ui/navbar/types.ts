export type LinkItem = { type: 'link'; href: string; label: string }
export type ActionItem = { type: 'action'; label: string; onClick: () => void }
export type NavItem = LinkItem | ActionItem
