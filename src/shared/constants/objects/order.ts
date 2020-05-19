import {OrderOptionsSort, OrderStatus, PaymentStatus} from '../../../app/enum/order';

const optionsSort: { key: OrderOptionsSort, name: string }[] = [
  {key: OrderOptionsSort.CLIENT_NAME, name: 'Nome do(a) cliente'},
  {key: OrderOptionsSort.COST_ITEMS, name: 'Custo dos itens'},
  {key: OrderOptionsSort.COST_SHIPPING, name: 'Custo de entrega'},
  {key: OrderOptionsSort.NEWEST, name: 'Mais recentes'},
  {key: OrderOptionsSort.OLDEST, name: 'Mais antigas'},
  {key: OrderOptionsSort.ORDER_STATUS, name: 'Estado da compra'},
  {key: OrderOptionsSort.PAYMENT_STATUS, name: 'Estado do pagamento'},
];
const orderStatus: { [key in OrderStatus]: string } = {
  [OrderStatus.CANCELED]: 'Cancelada',
  [OrderStatus.CREATED]: 'Criada',
  [OrderStatus.DELIVERED]: 'Entregue',
  [OrderStatus.DELIVERING]: 'Em entrega',
  [OrderStatus.PREPARING]: 'Preparando',
  [OrderStatus.RETURNED]: 'Devolvida',
};
const paymentStatus: { [key in PaymentStatus]: string } = {
  [PaymentStatus.APPROVED]: 'Aprovado',
  [PaymentStatus.CREATED]: 'Criado',
  [PaymentStatus.CANCELED]: 'Cancelado',
  [PaymentStatus.PENDING]: 'Pendente',
  [PaymentStatus.RETURNED]: 'Devolvido',
};
const orderStatusIterable = Object.keys(OrderStatus).map(k => k.toLowerCase());
const paymentStatusIterable = Object.keys(PaymentStatus).map(k => k.toLowerCase());
export const orderConstants = {
  optionsSort,
  orderStatus,
  orderStatusIterable,
  paymentStatus,
  paymentStatusIterable
};
