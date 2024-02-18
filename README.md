# REST API Documentation

## How to use it

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
  - `fullname`: The user's fullname.
  - `email`: The user's email.
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
- Request body: None
- Response: An array of product objects.

### GET /api/products/:id

- Description: Retrieve a specific product by ID.
- Request parameters:
  - `id`: The ID of the product.
- Request body: None
- Response: The product object.

### POST /api/products/

- Description: Create a new product.
- Request parameters: None
- Request body:
  - `name`: The name of the product.
  - `category_id`: The ID of the category the product belongs to.
- Response: The newly created product object.

### PUT /api/products/:id

- Description: Update a specific product by ID.
- Request parameters:
  - `id`: The ID of the product.
- Request body: The fields to update.
- Response: The updated product object.

### PUT /api/products/delete/:id

- Description: Soft delete a specific product by ID.
- Request parameters:
  - `id`: The ID of the product.
- Request body: None
- Response: The updated product object.

### DELETE /api/products/destroy/:id

- Description: Permanently delete a specific product by ID.
- Request parameters:
  - `id`: The ID of the product.
- Request body: None
- Response: A success message.

## Carts

### GET /api/carts/

- Description: Retrieve a list of all carts.
- Request parameters: None
- Request body: None
- Response: An array of cart objects.

### GET /api/carts/:id

- Description: Retrieve a specific cart by ID.
- Request parameters:
  - `id`: The ID of the cart.
- Request body: None
- Response: The cart object.

### POST /api/carts/

- Description: Create a new cart.
- Request parameters: None
- Request body:
  - `user_id`: The ID of the user the cart belongs to.
- Response: The newly created cart object.

### PUT /api/carts/

- Description: Update a specific cart by ID.
- Request parameters:
  - `id`: The ID of the cart.
- Request body: The fields to update.
- Response: The updated cart object.

### DELETE /api/carts/:id

- Description: Delete a specific cart by ID.
- Request parameters:
  - `id`: The ID of the cart.
- Request body: None
- Response: A success message.
