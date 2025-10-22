"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/migrateHexagrams.ts
var better_sqlite3_1 = require("better-sqlite3");
var client_1 = require("@libsql/client");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
// --- Setup SQLite local
var sqlite = new better_sqlite3_1.default('./data/db/iching.sqlite');
// --- Setup Turso
if (!process.env.TURSO_URL || !process.env.TURSO_AUTH_TOKEN) {
    throw new Error('TURSO_URL e TURSO_AUTH_TOKEN obrigatórios no .env');
}
var turso = (0, client_1.createClient)({
    url: process.env.TURSO_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});
function migrateHexagrams() {
    return __awaiter(this, void 0, void 0, function () {
        var rows, _i, rows_1, row, judgment, image, line_1, line_2, line_3, line_4, line_5, line_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rows = sqlite.prepare('SELECT * FROM hexagrams').all();
                    console.log("Encontrados ".concat(rows.length, " hexagramas na DB local."));
                    _i = 0, rows_1 = rows;
                    _a.label = 1;
                case 1:
                    if (!(_i < rows_1.length)) return [3 /*break*/, 4];
                    row = rows_1[_i];
                    judgment = typeof row.judgment === 'string'
                        ? row.judgment
                        : JSON.stringify(row.judgment);
                    image = typeof row.image === 'string' ? row.image : JSON.stringify(row.image);
                    line_1 = typeof row.line_1 === 'string' ? row.line_1 : JSON.stringify(row.line_1);
                    line_2 = typeof row.line_2 === 'string' ? row.line_2 : JSON.stringify(row.line_2);
                    line_3 = typeof row.line_3 === 'string' ? row.line_3 : JSON.stringify(row.line_3);
                    line_4 = typeof row.line_4 === 'string' ? row.line_4 : JSON.stringify(row.line_4);
                    line_5 = typeof row.line_5 === 'string' ? row.line_5 : JSON.stringify(row.line_5);
                    line_6 = typeof row.line_6 === 'string' ? row.line_6 : JSON.stringify(row.line_6);
                    // Inserção em Turso
                    return [4 /*yield*/, turso.execute({
                            sql: "\n        INSERT INTO hexagrams (\n          number, binary, name_chinese, name_en, unicode_hexagram, summary,\n          judgment, image, line_1, line_2, line_3, line_4, line_5, line_6\n        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\n      ",
                            args: [
                                row.number,
                                row.binary,
                                row.name_chinese,
                                row.name_en,
                                row.unicode_hexagram,
                                row.summary,
                                judgment,
                                image,
                                line_1,
                                line_2,
                                line_3,
                                line_4,
                                line_5,
                                line_6,
                            ],
                        })];
                case 2:
                    // Inserção em Turso
                    _a.sent();
                    console.log("Migrado hexagrama #".concat(row.number));
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('Migração completa!');
                    return [2 /*return*/];
            }
        });
    });
}
// Executa
migrateHexagrams().catch(function (err) {
    console.error('Erro durante a migração:', err);
});
