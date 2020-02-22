export class Usuario {

  public nome: string;
  public avatarUrl: string;
  public email: string;

  // TODO: Trabalhar com endereço, redes sociais, permissões/role
  constructor(nome: string, email: string, urlImg?: string) {
    this.nome = nome;
    this.email = email;
    this.avatarUrl = urlImg;
  }

  public definirUrlAvatar(urlImagem: string) {
    this.avatarUrl = urlImagem;
  }
}
