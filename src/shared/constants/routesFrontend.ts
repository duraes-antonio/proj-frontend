const manager = 'gerencia';
const productsManager = `${manager}/produto`;
const login = 'login';
const productsView = 'produto';
const user = 'usuario/:id';

export const routesFrontend = {
  notFound: '404',

  productsView: productsView,
  productView: `${productsView}/:id`,
  productsManagement: productsManager,
  cart: 'carrinho',
  home: 'home',
  login: login,
  loginEnter: `${login}/entrar`,
  loginRegister: `${login}/cadastrar`,
  checkout: 'finalizar-compra',

  // Rotas a implementar
  ordersManagement: `${manager}/pedido`,
  reviewsManagement: `${manager}/avaliacao`,
  reports: 'relatorios',
  forgotPass: 'redefinir-senha',
  about: 'sobre',
  contact: 'contato',
  categories: 'categorias',

  userProfile: `${user}/perfil`,
  userReviews: `${user}/avaliacoes`,
  userOrders: `${user}/pedidos`,
  userActivities: `${user}/atividades`,
  userAddress: `${user}/enderecos`,
  userSecurity: `${user}/seguranca`
};
