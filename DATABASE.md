### Contexto

Este website foi feito através de Next JS 15 com uma base de dados local em SQLite.
Visto que quero usar o Vercel para dar deploy e que este sendo serverless não suporta uma base de dados local, decidi mudar para o Turso.
Quis manter as duas bases de dados uma para desenvolvimento (SQLite local) e para produção (Turso).

npm run dev - vai dar desenvolvimento local (SQLite)
next build && next start --env-file .env.production
