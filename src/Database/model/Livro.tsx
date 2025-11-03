export class Livro {
  public id?: number;
  public titulo: string;
  public autor: string;
  public genero: string;
  public ano: number;
  public status: string;
  public resenha?: string; 

  constructor(obj?: Partial<Livro>) {
    if (obj) {
      this.id = obj.id;
      this.titulo = obj.titulo;
      this.autor = obj.autor;
      this.genero = obj.genero;
      this.ano = obj.ano;
      this.status = obj.status;
      this.resenha = obj.resenha;
    }
  }

  toObjeto() {
    return {
      id: this.id,
      titulo: this.titulo,
      autor: this.autor,
      genero: this.genero,
      ano: this.ano,
      status: this.status,
      resenha: this.resenha,
    };
  }

  toString() {
    const atributos = Object.values(this).join(',');
    return `Livro [${atributos}]`;
  }
}
