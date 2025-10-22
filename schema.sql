-- users
CREATE TABLE users (
  id INTEGER PRIMARY KEY, -- AUTOINCREMENT não necessário, Turso auto incrementa IDs inteiros
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

-- contacts
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- hexagram_list
CREATE TABLE hexagram_list (
  number INTEGER PRIMARY KEY,
  unicode TEXT NOT NULL,
  english_name TEXT NOT NULL,
  chinese_name TEXT,
  trigram_upper_unicode TEXT,
  trigram_upper_name TEXT,
  trigram_lower_unicode TEXT,
  trigram_lower_name TEXT,
  description TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- hexagram_reference
CREATE TABLE hexagram_reference (
  number INTEGER PRIMARY KEY,
  unicode TEXT NOT NULL,
  english_name TEXT NOT NULL,
  chinese_name TEXT,
  trigram_upper_unicode TEXT,
  trigram_upper_name TEXT,
  trigram_lower_unicode TEXT,
  trigram_lower_name TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- hexagrams
CREATE TABLE hexagrams (
  number INTEGER PRIMARY KEY,
  binary TEXT UNIQUE,
  name_chinese TEXT,
  name_en TEXT,
  unicode_hexagram TEXT,
  summary TEXT,
  judgment TEXT,  -- JSON armazenado como string
  image TEXT,     -- JSON armazenado como string
  line_1 TEXT,    -- JSON armazenado como string
  line_2 TEXT,
  line_3 TEXT,
  line_4 TEXT,
  line_5 TEXT,
  line_6 TEXT
);

-- readings
CREATE TABLE readings (
  id INTEGER PRIMARY KEY,
  question TEXT,
  notes TEXT,
  originalBinary TEXT,
  mutantBinary TEXT,
  user_id INTEGER NOT NULL,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- trigram_reference
CREATE TABLE trigram_reference (
  unicode TEXT PRIMARY KEY,
  chinese_name TEXT,
  english_name TEXT
);
