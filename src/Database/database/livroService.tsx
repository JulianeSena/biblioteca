import { Database } from './Database';
import { Livro } from '../model/Livro';
 
export class LivroService {
  static TABLE = 'livro';

  //Criar livro
  static async create(obj: Livro) {
    const resultado = await Database.create(obj);
    return resultado;
  }

  //Atualizar livro
  static async update(obj: Livro) {
    const resultado = await Database.update(obj);
    return resultado;
  }

  //Deletar livro
  static async delete(obj: Livro) {
    if (!obj.id) throw new Error('ID do livro não definido');
    const resultado = await Database.deletar(obj.id);
    return resultado;
  }

  //Listar todos os livros
  static async findAll(): Promise<Livro[]> {
    const allRows = await Database.getAll();
    return allRows.map(row => new Livro(row));
  }

  //Buscar por título
  static async findByNome(nome: string): Promise<Livro | null> {
    const row = await Database.findByNome(nome);
    return row ? new Livro(row) : null;
  }
}
