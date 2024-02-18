# REST API Documentation

## Seting up this API

### Initial Setup

- Clone this project.
- Go to the directory.

```cmd
cd eshop-api
```

- And then `npm install` to install all dependecies.

### Generate your own database

- Prisma needs some information about your database. So, let we create `.env` file, copy inside of `.env.example` and changes this part by your database credential. In this project we will use MySQL.

```
DATABASE_URL = "mysql://user:password@localhost:3306/database_name"
```

- Also you can setup other variable in env file for later use.
- Migrating our model into database, we should run `npm run migrate` or `npx prisma migrate dev`.
- Last, `npm run dev` for running our application.

### Dummy Data

- You can run seeder file in `database` folder for filling up database, feel free to adjust how much data you need.

### Setup for Payment Gateway

- We would using a dummy payment gateway, just clone this repository below, and setup the server at another port. Maka sure that application server running before doing payments.

```bash
git clone https://github.com/harrymahardhika/dummy-payment-gateway.git
```

## Authentication

### POST /api/auth/login

- Description: Authenticate a user and return an access token.
- Request parameters: None
- Request body:
  - `username`: The user's username.
  - `password`: The user's password.
- Response:
  - `token`: The access token for the authenticated user.

## Users

### GET /api/users/

- Description: Retrieve a list of all users.
- Request parameters: None
- Request body: None
- Response: An array of user objects.

### GET /api/users/:id

- Description: Retrieve a specific user by ID.
- Request parameters:
  - `id`: The ID of the user.
- Request body: None
- Response: The user object.

### POST /api/users/register

- Description: Register a new user.
- Request parameters: None
- Request body:
  - `username`: The user's username.
  - `password`: The user's password.
- Response: The newly created user object.

### PUT /api/users/:id

- Description: Update a specific user by ID.
- Request parameters:
  - `id`: The ID of the user.
- Request body: The fields to update.
- Response: The updated user object.

### PUT /api/users/deactive/:id

- Description: Deactivate a specific user by ID.
- Request parameters:
  - `id`: The ID of the user.
- Request body: None
- Response: The updated user object.

### DELETE /api/users/destroy/:id

- Description: Permanently delete a specific user by ID.
- Request parameters:
  - `id`: The ID of the user.
- Request body: None
- Response: A success message.

## Categories

### GET /api/categories/

- Description: Retrieve a list of all categories.
- Request parameters: None
- Request body: None
- Response: An array of category objects.

### GET /api/categories/:id

- Description: Retrieve a specific category by ID.
- Request parameters:
  - `id`: The ID of the category.
- Request body: None
- Response: The category object.

### POST /api/categories/

- Description: Create a new category.
- Request parameters: None
- Request body:
  - `name`: The name of the category.
- Response: The newly created category object.

### PUT /api/categories/:id

- Description: Update a specific category by ID.
- Request parameters:
  - `id`: The ID of the category.
- Request body: The fields to update.
- Response: The updated category object.

### DELETE /api/categories/:id

- Description: Delete a specific category by ID.
- Request parameters:
  - `id`: The ID of the category.
- Request body: None
- Response: A success message.

## Products

### GET /api/products/

- Description: Retrieve a list of all products.
- Request parameters: None
- Request query:

  - `/api/product?search=` : search product by name
  - `/api/product?sort=` : sort product by product field, default is sort by id
  - `/api/product?order=` : order by `asc` or `desc`
  - `/api/product?page=` : choose what page that will show
  - `/api/product?limit=` : limit products for one page

- Request body: None
- Response: An array of product objects.

### GET /api/products/:id

- Description: Retrieve a specific product by ID.
- Request parameters:
  - `id`: The ID of the product.
- Request body: None
- Response: The product object.

### POST /api/products/admin

- Description: Admin endpoint to create a new product.
- Request parameters: None
- Request body:
  - `name`: The name of the product.
  - `category_id`: The ID of the category the product belongs to.
- Response: The newly created product object.

### POST /api/products/

- Description: Create a new product.
- Request parameters: None
- Request body:
  - `name`: The name of the product.
  - `category_id`: The ID of the category the product belongs to.
- Response: The newly created product object.

### PUT /api/products/admin:id

- Description: Admin endpoint to update a specific product by ID.
- Request parameters:
  - `id`: The ID of the product.
- Request body: The fields to update.
- Response: The updated product object.

### PUT /api/products/:id

- Description: Update a specific product by ID.
- Request parameters:
  - `id`: The ID of the product.
- Request body: The fields to update.
- Response: The updated product object.

### DELETE /api/products/admin/delete/:id

- Description: Admin endpoint to soft delete a specific product by ID.
- Request parameters:
  - `id`: The ID of the product.
- Request body: None
- Response: The updated product object.

### DELETE /api/products/delete/:id

- Description: Soft delete a specific product by ID.
- Request parameters:
  - `id`: The ID of the product.
- Request body: None
- Response: The updated product object.

### DELETE /api/products/admin/destroy/:id

- Description: Admin endpoint to permanently delete a specific product by ID.
- Request parameters:
  - `id`: The ID of the product.
- Request body: None
- Response: A success message.

## Carts

### GET /api/carts/admin

- Description: Admin endpoint to retrieve a list of all carts.
- Request parameters: None
- Request body: None
- Response: An array of cart objects.

### GET /api/carts/admin/:id

- Description: Admin endpoint to retrieve a specific cart by ID.
- Request parameters:
  - `id`: The ID of the cart.
- Request body: None
- Response: The cart object.

### GET /api/carts/

- Description: Retrieve a list of all carts.
- Request parameters: None
- Request body: None
- Response: An array of cart objects.

### POST /api/carts/admin

- Description: Admin endpoint to create a new cart.
- Request parameters: None
- Request body:
  - `user_id`: The ID of the user the cart belongs to.
- Response: The newly created cart object.

### POST /api/carts/

- Description: Create a new cart.
- Request parameters: None
- Request body:
  - `user_id`: The ID of the user the cart belongs to.
- Response: The newly created cart object.

### PUT /api/carts/admin

- Description: Admin endpoint to update a specific cart by ID.
- Request parameters:
  - `id`: The ID of the cart.
- Request body: The fields to update.
- Response: The updated cart object.

### PUT /api/carts/

- Description: Update a specific cart by ID.
- Request parameters:
  - `id`: The ID of the cart.
- Request body: The fields to update.
- Response: The updated cart object.

### DELETE /api/carts/admin/:id

- Description: Admin endpoint to delete a specific cart by ID.
- Request parameters:
  - `id`: The ID of the cart.
- Request body: None
- Response: A success message.

### DELETE /api/carts/:id

- Description: Delete a specific cart by ID.
- Request parameters:
  - `id`: The ID of the cart.
- Request body: None
- Response: A success message.

## Orders

### GET /api/orders/admin

- Description: Admin endpoint to retrieve a list of all orders.
- Request parameters: None
- Request body: None
- Response: An array of order objects.

### GET /api/orders/seller

- Description: Seller endpoint to retrieve a list of all orders.
- Request parameters: None
- Request body: None
- Response: An array of order objects.

### GET /api/orders/

- Description: Retrieve a list of all orders.
- Request parameters: None
- Request body: None
- Response: An array of order objects.

### POST /api/orders/create

- Description: Create a new order.
- Request parameters: None
- Request body:
  - `user_id`: The ID of the user the order belongs to.
  - `product_id`: The ID of the product the order is for.
- Response: The newly created order object.

### POST /api/orders/payment

- Description: Process a payment for an order.
- Request parameters: None
- Request body:
  - `order_id`: The ID of the order to process payment for.
  - `payment_method`: The method of payment.
- Response: A success message.

### PUT /api/orders/updateStatus/:id

- Description: Update the status of a specific order by ID.
- Request parameters:
  - `id`: The ID of the order.
- Request body:
  - `status`: The new status of the order.
- Response: The updated order object.

### DELETE /api/orders/cancel/:id

- Description: Cancel a specific order by ID.
- Request parameters:
  - `id`: The ID of the order.
- Request body: None
- Response: A success message.
