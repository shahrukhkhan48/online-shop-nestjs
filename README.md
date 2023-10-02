
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

3. Initialize the database using the provided script:

```bash
psql -U your_db_username -d your_database_name -a -f scripts/db_initialization.sql
```

Replace `your_db_username` with your PostgreSQL username and `your_database_name` with the name of your database.

4. Update the placeholder password for the admin user in the database with a hashed password.

### Running the Application

Start the NestJS application with:

```bash
npm run start
```

## Using the API

### User Registration and Authentication

- Register a new user:

POST `/users/register`
Body: `{{"username": "your_username", "password": "your_password", "role": "customer"}}`

- Login:

POST `/users/login`
Body: `{{"username": "your_username", "password": "your_password"}}`

On successful login, you'll receive a JWT token. Use this token as a bearer token in the Authorization header to access protected routes.


### Products

1. **Get all products**:
   - Endpoint: `GET /products`

2. **Get a single product**:
   - Endpoint: `GET /products/:id`
   - Replace `:id` with the actual product ID.

3. **Add a new product (Admin only)**:
   - Endpoint: `POST /products`
   - Body:
   ```json
   {
     "title": "Product Title",
     "description": "Product Description",
     "price": 100.50
   }
   ```

4. **Update a product (Admin only)**:
   - Endpoint: `PUT /products/:id`
   - Replace `:id` with the actual product ID you want to update.
   - Body:
   ```json
   {
     "title": "Updated Product Title",
     "description": "Updated Product Description",
     "price": 105.00
   }
   ```

5. **Delete a product (Admin only)**:
   - Endpoint: `DELETE /products/:id`
   - Replace `:id` with the actual product ID you want to delete.


Remember to include the JWT token in the request headers for routes that require authentication:
```bash
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

### Role-Based Access Control

Only users with the `admin` role can create, update, and delete products. Both `admin` and `customer` roles can view products.

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
