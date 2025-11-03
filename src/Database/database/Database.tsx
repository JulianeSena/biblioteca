import * as SQLite from 'expo-sqlite';

interface Query {
  sql: string;
  args?: (string | number)[];
}

const table = "livro";

export class Database {
  static async getConnection() {
    const db = await SQLite.openDatabaseAsync("biblioteca.db");
    return db;
  }

  static async initDb(syncDb?: boolean) {
    const db = await this.getConnection();
    console.log("Database inicializado:", db.databasePath);

    if (syncDb || !(await this.isDbCreated())) {
      console.log("Criando tabela...");
      await this.dropDb();
      await this.createDb();
    } else {
      console.log("Tabela já existente!");
    }
  }


  private static async isDbCreated() {
    try {
      await this.runQuery(`SELECT 1 FROM ${table} LIMIT 1;`);
      return true;
    } catch (e) {
      console.log("Tabela não existe, criando...");
      return false;
    }
  }

  private static async dropDb() {
    try {
      await this.runQuery(`DROP TABLE IF EXISTS ${table};`);
    } catch (error) {
      console.log("Erro ao dropar tabela:", error);
    }
  }

  private static async createDb() {
    const query = `
      CREATE TABLE IF NOT EXISTS ${table} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        autor TEXT NOT NULL,
        genero TEXT,
        ano INTEGER,
        status TEXT, 
        resenha TEXT
      );
    `;
    await this.runQuery(query);
    console.log("Tabela 'livro' criada com sucesso!");
  }

  static async runQuery(sql: Query['sql'], args?: Query['args']) {
    const db = await this.getConnection();
    try {
      console.log("Executando SQL:", sql, "Args:", args);
      const result = await db.runAsync(sql, args);
      return result.lastInsertRowId;
    } catch (error) {
      console.log("Erro ao executar query:", error);
      throw error;
    }
  }

  static async getAll() {
    const db = await this.getConnection();
    try {
      const result = await db.getAllAsync(`SELECT * FROM ${table};`);
      return result;
    } catch (error) {
      console.log("Erro ao buscar livros:", error);
      return [];
    }
  }

  static async findAll() {
    return await this.getAll();
  }

  static async findById(id: number) {
    const db = await this.getConnection();
    try {
      const result = await db.getFirstAsync(`SELECT * FROM ${table} WHERE id = ?;`, [id]);
      return result;
    } catch (error) {
      console.log("Erro ao buscar por ID:", error);
      return null;
    }
  }

  static async insert(livro: { titulo: string; autor: string; genero: string; ano: number; status: string }) {
    const query = `
      INSERT INTO ${table} (titulo, autor, genero, ano, status, resenha)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const result = await this.runQuery(query, [
      livro.titulo,
      livro.autor,
      livro.genero,
      livro.ano,
      livro.status,
      livro.resenha,
    ]);
    return result;
  }

  static async update(livro: { id: number; titulo: string; autor: string; genero: string; ano: number; status: string }) {
    const query = `
      UPDATE ${table}
      SET titulo = ?, autor = ?, genero = ?, ano = ?, status = ?
      WHERE id = ?;
    `;
    await this.runQuery(query, [
      livro.titulo,
      livro.autor,
      livro.genero,
      livro.ano,
      livro.status,
      livro.id,
    ]);
    return true;
  }

  static async delete(livro: any) {
    if (!livro || !livro.id) {
      throw new Error("Livro ou ID inválido");
    }
    const query = `DELETE FROM ${table} WHERE id = ?;`;
    await this.runQuery(query, [livro.id]);
    return true;
  }
}
