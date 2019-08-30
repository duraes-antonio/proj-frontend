export class Usuario {

  public nome: string;
  public avatarUrl: string;
  public email: string;

  // TODO: Trabalhar com endereço, redes sociais, permissões/role
  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }

  public definirUrlAvatar(urlImagem: string) {
    this.avatarUrl = urlImagem;
  }
}
