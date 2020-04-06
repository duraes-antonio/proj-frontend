const manager = 'gerencia';
const productsManager = `${manager}/produto`;
const login = 'login';
const productsView = 'produto';

export const routesFrontend = {
  notFound: '404',

  productsView: productsView,
  productView: `${productsView}/:id`,
  productsManager: productsManager,
  productManager: `${productsManager}/:id`,
  cart: 'carrinho',
  home: 'home',
  forgotPass: 'redefinir-senha',
  login: login,
  loginEnter: `${login}/entrar`,
  loginRegister: `${login}/cadastrar`,
  checkout: 'finalizar-compra'
};
