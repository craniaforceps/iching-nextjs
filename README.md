# I Ching Hexagram Reader

A modern web application to explore and generate I Ching hexagrams, inspired by traditional divination methods.

## ✨ Features

- Generate hexagrams using the coin method (automated and manual modes)
- View original and changing hexagrams
- Interpretations and commentary (in progress)
- User accounts and reading history (planned)
- Personal notes per reading
- Trigram cross-reference table (8x8)
- Hexagram sequence index (1–64)

## 🛠️ Stack

- **Next.js** (App Router)
- **Tailwind CSS** for styling
- **TypeScript** for static typing
- **(Planned)**: Authentication (NextAuth), database (TBD), shadcn/ui

## 📁 Project Structure (WIP)

```bash
app/
├── page.tsx              # Home (Quick reading)
├── leitura/              # Reading page (manual method)
├── hexagramas/           # 1-64 index
├── trigramas/            # Trigram table

components/
├── tables/
│   ├── HexagramGrid.tsx
│   ├── TrigramCrossTable.tsx
├── Header.tsx
├── ReadingResult.tsx

lib/
├── hexagram.ts           # Hexagram logic
├── coinMethod.ts         # Coin method generation
```

🚧 Status

This project is currently under active development as a personal learning and portfolio exercise. Contributions and feedback are welcome.

Parts of this project were planned and structured with the assistance of AI tools like ChatGPT, but all implementation is original and serves educational purposes.
