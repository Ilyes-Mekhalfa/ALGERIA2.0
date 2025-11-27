module.exports = {
  // User Service Topics
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
  USER_DELETED: 'user.deleted',
  USER_VERIFIED: 'user.verified',
  USER_PASSWORD_CHANGED: 'user.password.changed',

  // Auth Topics
  USER_LOGGED_IN: 'user.logged.in',
  USER_LOGGED_OUT: 'user.logged.out',
  LOGIN_FAILED: 'login.failed',

  // Order Topics
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  ORDER_CANCELLED: 'order.cancelled',
  ORDER_COMPLETED: 'order.completed',

  // Product Topics
  PRODUCT_CREATED: 'product.created',
  PRODUCT_UPDATED: 'product.updated',
  PRODUCT_DELETED: 'product.deleted',

  // Transport Topics
  TRANSPORT_CREATED: 'transport.created',
  TRANSPORT_UPDATED: 'transport.updated',

  // Notification Topics
  SEND_EMAIL: 'notification.email.send',
  SEND_SMS: 'notification.sms.send',
  SEND_PUSH: 'notification.push.send',
};
