import { Database } from './Database';

export class Usuario {
  public id?: number;
  public nome: string;
  public senha: string;

  constructor(obj?: Partial<Usuario>) {
    if (obj) {
      this.id = obj.id;
      this.nome = obj.nome;
      this.senha = obj.senha;
    }
  }
}

export class UsuarioService {
  static TABLE = 'usuario';
  static async initDb() {
    await Database.runQuery(
      `
      CREATE TABLE IF NOT EXISTS ${this.TABLE} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
      );
      `
    );
  }

  static async create(obj: Usuario) {
    const resultado = await Database.runQuery(
      `
      INSERT INTO ${this.TABLE} (nome, senha)
      VALUES (?, ?)
      `,
      [obj.nome, obj.senha]
    );

    obj.id = resultado;
    return obj;
  }

  static async login(nome: string, senha: string) {
    const db = await Database.getConnection();

    try {
      const user = await db.getFirstAsync(
        `SELECT * FROM ${this.TABLE} WHERE nome = ? AND senha = ?;`,
        [nome, senha]
      );

      if (user) {
        return new Usuario(user);
      } else {
        return null;
      }
    } catch (error) {
      console.log("Erro ao fazer login:", error);
      return null;
    }
  }
}
