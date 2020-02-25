const manager = 'gerencia';
const productsManager = `${manager}/produto`;
const login = `login`;
const productsView = `produto`;

export const routes = {
  productsView: productsView,
  productView: `${productsView}/:id`,
  productsManager: productsManager,
  productManager: `${productsManager}/:id`,

  home: `home`,
  forgotPass: `redefinir-senha`,
  login: login,
  loginEnter: `${login}/entrar`,
  loginRegister: `${login}/cadastrar`
};
