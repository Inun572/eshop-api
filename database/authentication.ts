export const Role = {
  ADMINISTRATOR: 'administrator',
  SELLER: 'seller',
  REGULAR_USER: 'user',
};

export const Permission = {
  BROWSE_USERS: 'browse_users',
  READ_USER: 'read_user',
  EDIT_USER: 'edit_user',
  ADD_USER: 'add_user',
  DELETE_USER: 'delete_user',

  BROWSE_ALL_PRODUCTS: 'browse_all_products',
  READ_ALL_PRODUCT: 'read_all_product',
  EDIT_ALL_PRODUCT: 'edit_all_product',
  ADD_ALL_PRODUCT: 'add_all_product',
  DELETE_ALL_PRODUCT: 'delete_all_product',

  EDIT_OWN_PRODUCT: 'edit_own_product',
  ADD_OWN_PRODUCT: 'add_own_product',
  DELETE_OWN_PRODUCT: 'delete_own_product',

  BROWSE_CATEGORIES: 'browse_categories',
  READ_CATEGORY: 'read_category',
  EDIT_CATEGORY: 'edit_category',
  ADD_CATEGORY: 'add_category',
  DELETE_CATEGORY: 'delete_category',

  BROWSE_CARTS: 'browse_cart',
  READ_CART: 'read_cart',
  EDIT_CART: 'edit_cart',
  ADD_CART: 'add_cart',
  DELETE_CART: 'delete_cart',

  BROWSE_ORDERS: 'browse_orders',
  READ_ORDER: 'read_order',
  EDIT_ORDER: 'edit_order',
  ADD_ORDER: 'add_order',
  DELETE_ORDER: 'delete_order',
};

export const PermissionAssignment = {
  [Role.ADMINISTRATOR]: [
    Permission.BROWSE_USERS,
    Permission.READ_USER,
    Permission.EDIT_USER,
    Permission.ADD_USER,
    Permission.DELETE_USER,

    Permission.BROWSE_ALL_PRODUCTS,
    Permission.READ_ALL_PRODUCT,
    Permission.EDIT_ALL_PRODUCT,
    Permission.ADD_ALL_PRODUCT,
    Permission.DELETE_ALL_PRODUCT,

    Permission.BROWSE_CATEGORIES,
    Permission.READ_CATEGORY,
    Permission.EDIT_CATEGORY,
    Permission.ADD_CATEGORY,
    Permission.DELETE_CATEGORY,

    Permission.BROWSE_CARTS,
    Permission.READ_CART,
    Permission.EDIT_CART,
    Permission.ADD_CART,
    Permission.DELETE_CART,

    Permission.BROWSE_ORDERS,
    Permission.READ_ORDER,
    Permission.EDIT_ORDER,
    Permission.ADD_ORDER,
    Permission.DELETE_ORDER,
  ],

  [Role.SELLER]: [
    Permission.BROWSE_ALL_PRODUCTS,
    Permission.READ_ALL_PRODUCT,

    Permission.EDIT_OWN_PRODUCT,
    Permission.ADD_OWN_PRODUCT,
    Permission.DELETE_OWN_PRODUCT,

    Permission.BROWSE_CATEGORIES,
    Permission.READ_CATEGORY,
    Permission.EDIT_CATEGORY,
    Permission.ADD_CATEGORY,
    Permission.DELETE_CATEGORY,

    Permission.BROWSE_CARTS,
    Permission.READ_CART,
    Permission.EDIT_CART,
    Permission.ADD_CART,
    Permission.DELETE_CART,

    Permission.BROWSE_ORDERS,
    Permission.READ_ORDER,
    Permission.EDIT_ORDER,
    Permission.ADD_ORDER,
    Permission.DELETE_ORDER,
  ],

  [Role.REGULAR_USER]: [
    Permission.BROWSE_ALL_PRODUCTS,
    Permission.READ_ALL_PRODUCT,

    Permission.BROWSE_CATEGORIES,
    Permission.READ_CATEGORY,

    Permission.BROWSE_CARTS,
    Permission.READ_CART,
    Permission.EDIT_CART,
    Permission.ADD_CART,
    Permission.DELETE_CART,

    Permission.BROWSE_ORDERS,
    Permission.READ_ORDER,
    Permission.EDIT_ORDER,
    Permission.ADD_ORDER,
    Permission.DELETE_ORDER,
  ],
};
