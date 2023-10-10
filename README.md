
# Online Shop API with NestJS

This is a NestJS-based API for an online shop. It provides endpoints for managing products and categories, as well as user registration, authentication, and role-based access control.

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL

### Installation

1. Install the necessary npm packages:

```bash
npm install
```

2. Set up your PostgreSQL server and update the TypeORM configuration in `src/app.module.ts` with your database credentials.


### Running the Application

Start the NestJS application with:

```bash
npm run start
```

#### Admin User Creation

When running the application with `npm run start`, if an admin user does not exist, one will be automatically created with the following credentials:
- **Username**: admin
- **Password**: admin
- **Role**: admin


## Using the API

### User Registration and Authentication

- **Register a new user:**
   - **Endpoint:** POST `/users/register`
   - **Body:**
     ```json
     {
       "username": "your_username",
       "password": "your_password",
       "role": "customer"
     }
     ```
  Note: Only users with `admin` role can create new users with `admin` role.

- **Login:**
   - **Endpoint:** POST `/users/login`
   - **Body:**
     ```json
     {
       "username": "your_username",
       "password": "your_password"
     }
     ```
  Upon successful login, you'll receive a JWT token. Use this token as a bearer token in the Authorization header to access protected routes.

### Products

1. **Get all products:**
   - **Endpoint:** GET `/products`

2. **Get a single product:**
   - **Endpoint:** GET `/products/:id`
   - Replace `:id` with the actual product ID.

3. **Get products by category:**
   - **Endpoint:** GET `/category/:categoryId/products`
   - Replace `:categoryId` with the actual category ID.

4. **Add a new product (Admin only):**
   - **Endpoint:** POST `/products`
   - **Body:**
     ```json
     {
       "categoryId": "Category_ID",
       "name": "Product Name",
       "price": 100.50
     }
     ```

5. **Update a product (Admin only):**
   - **Endpoint:** PUT `/products/:id`
   - Replace `:id` with the actual product ID you want to update.
   - **Body:**
     ```json
     {
       "categoryId": "New_Category_ID",
       "name": "Updated Product Name",
       "price": 105.00
     }
     ```

6. **Delete a product (Admin only):**
   - **Endpoint:** DELETE `/products/:id`
   - Replace `:id` with the actual product ID you want to delete.

### Categories

1. **Get all categories:**
   - **Endpoint:** GET `/categories`

2. **Add a new category (Admin only):**
   - **Endpoint:** POST `/categories`
   - **Body:**
     ```json
     {
       "name": "Category Name"
     }
     ```

3. **Update a category (Admin only):**
   - **Endpoint:** PUT `/categories/:id`
   - Replace `:id` with the actual category ID you want to update.
   - **Body:**
     ```json
     {
       "name": "Updated Category Name"
     }
     ```

4. **Delete a category (Admin only):**
   - **Endpoint:** DELETE `/categories/:id`
   - Replace `:id` with the actual category ID you want to delete.

### Authorization

Remember to include the JWT token in the request headers for routes that require authentication:
```bash
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### Role-Based Access Control

Only users with the `admin` role can create, update, and delete products and categories. Both `admin` and `customer` roles can view products and categories.


## GraphQL Interface

If you've integrated GraphQL, you can access the GraphQL playground at:

```
http://localhost:3000/graphql
```

## Further Information

For more details on specific endpoints or GraphQL operations, refer to the inline documentation or generated API docs (if available).

## JWT Authentication

After successful registration or login, the API returns a JWT (JSON Web Token). This token serves as proof of authentication and should be included in the header of subsequent requests to access protected routes.

### Obtaining the JWT Token

1. Register a new user or log in using the provided endpoints.
2. On successful authentication, the response will include a JWT token.

Example response:
```json
{
  "access_token": "YOUR_JWT_TOKEN_HERE"
}
```

### Using the JWT Token

1. For making requests to protected routes, include the JWT token in the request headers.

```bash
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

Replace `YOUR_JWT_TOKEN_HERE` with the actual token obtained after logging in.

### Token Expiration

Depending on the configuration, JWT tokens may have an expiration time. If your token is expired, you'll need to log in again to obtain a new token.

If you encounter authentication errors, ensure your token is valid and hasn't expired.

Remember to include the JWT token in the request headers for routes that require authentication:
```bash
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```
