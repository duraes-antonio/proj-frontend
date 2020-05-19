'use strict';

export enum OrderOptionsSort {
  CLIENT_NAME = 'client_name',
  COST_ITEMS = 'cost_items',
  COST_SHIPPING = 'cost_shipping',
  NEWEST = 'newest',
  OLDEST = 'oldest',
  ORDER_STATUS = 'order_status',
  PAYMENT_STATUS = 'payment_status',
}

export enum OrderStatus {
  CANCELED = 'canceled',
  CREATED = 'created',
  DELIVERED = 'delivered',
  DELIVERING = 'delivering',
  PREPARING = 'preparing',
  RETURNED = 'returned'
}

export enum PaymentStatus {
  APPROVED = 'approved',
  CANCELED = 'canceled',
  CREATED = 'created',
  PENDING = 'pending',
  RETURNED = 'returned'
}
