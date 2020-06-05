const manager = 'gerencia';
const login = 'login';
const productsView = 'produto';
const user = 'usuario/:userId';
const customize = 'personalizar';

export const routesFrontend = {
  forbidden: '403',
  notFound: '404',

  productsView: productsView,
  productView: `${productsView}/:id`,
  cart: 'carrinho',
  home: 'home',
  login: login,
  loginEnter: `${login}/entrar`,
  loginRegister: `${login}/cadastrar`,
  checkout: 'finalizar-compra',

  /*Rotas para gerência de itens*/
  productsManagement: `${manager}/produto`,
  ordersManagement: `${manager}/pedido`,
  usersManagement: `${manager}/usuario`,
  categoriesManagement: `${manager}/categorias`,

  /*Rotas para personalização de componentesvisuais*/
  customize: customize,
  customizeProductList: `${customize}/produtos`,

  // Rotas a implementar
  reviewsManagement: `${manager}/avaliacao`, // NIVEL: 3-4 [OPCIONAL]
  about: 'sobre', // NIVEL: 1-2 [OPCIONAL]
  contact: 'contato', // NIVEL: 1-2 [OPCIONAL]
  reports: 'relatorios', // NIVEL: 3+
  forgotPass: 'redefinir-senha', // NIVEL: 2-3 [OPCIONAL]

  userProfile: user, // NIVEL: 3-5 [OPCIONAL]
  userOrders: `${user}/pedidos`, // NIVEL: 2-4 [OPCIONAL - PARCIAL]
  userActivities: `${user}/atividades`, // NIVEL: 2-3 [OPCIONAL]
  userSecurity: `${user}/seguranca`, // NIVEL: 2-4 [OPCIONAL]
  userReviews: `${user}/avaliacoes`, // NIVEL: 2-4 [OPCIONAL]
};
