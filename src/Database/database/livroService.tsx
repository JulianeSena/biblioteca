import { Database } from './Database';
import { Livro } from '../model/Livro';
 
export class LivroService {
  static TABLE = 'livro';

  static async create(obj: Livro) {
    const resultado = await Database.insert(obj);
    return resultado;
  }

  static async update(obj: Livro) {
    const resultado = await Database.update(obj);
    return resultado;
  }

  static async delete(obj: Livro) {
    if (!obj.id) throw new Error('ID do livro não definido');
    const resultado = await Database.delete(obj.id);
    return resultado;
  }

  static async findAll(): Promise<Livro[]> {
    const allRows = await Database.getAll();
    return allRows.map(row => new Livro(row));
  }

}
