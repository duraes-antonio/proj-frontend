const manager = 'gerencia';
const login = 'login';
const productsView = 'produto';
const user = 'usuario/:id';

export const routesFrontend = {
  forbidden: '403',
  notFound: '404',

  productsView: productsView,
  productView: `${productsView}/:id`,
  productsManagement: `${manager}/produto`,
  cart: 'carrinho',
  home: 'home',
  login: login,
  loginEnter: `${login}/entrar`,
  loginRegister: `${login}/cadastrar`,
  checkout: 'finalizar-compra',

  // Rotas a implementar
  ordersManagement: `${manager}/pedido`, // NIVEL: 2-3
  reviewsManagement: `${manager}/avaliacao`, // NIVEL: 3-4 [OPCIONAL]
  usersManagement: `${manager}/usuario`, // NIVEL: 3-4
  categoriesManagement: `${manager}/categorias`, // NIVEL: 2-4

  about: 'sobre', // NIVEL: 1-2 [OPCIONAL]
  contact: 'contato', // NIVEL: 1-2 [OPCIONAL]
  reports: 'relatorios', // NIVEL: 3+
  customize: 'personalizar', // NIVEL: 3-5
  forgotPass: 'redefinir-senha', // NIVEL: 2-3 [OPCIONAL]

  userProfile: `${user}/perfil`, // NIVEL: 3-5 [OPCIONAL]
  userOrders: `${user}/pedidos`, // NIVEL: 2-4 [OPCIONAL - PARCIAL]
  userActivities: `${user}/atividades`, // NIVEL: 2-3 [OPCIONAL]
  userSecurity: `${user}/seguranca`, // NIVEL: 2-4 [OPCIONAL]
  userReviews: `${user}/avaliacoes`, // NIVEL: 2-4 [OPCIONAL]
};
