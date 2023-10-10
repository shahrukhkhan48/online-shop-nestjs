
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



## Getting Started

### Visit the Homepage

**Open Your Browser**: Navigate to [http://localhost:3000](http://localhost:3000) to view the welcome page.

   This page provides a quick overview of how to interact with the API and the GraphQL Playground, ensuring a smooth start with the developed application.

### GraphQL Playground

The GraphQL Playground provides a space to interactively explore and test the GraphQL API. You can access it by visiting:

- [http://localhost:3000/graphql](http://localhost:3000/graphql)

In the playground, you can create, test, and optimize your GraphQL queries and mutations before utilizing them in your application development or for testing purposes.

### Download the Postman Collection

1. **Download**: To interact with the REST API, download the Postman collection from the homepage or directly from [http://localhost:3000/Online%20Shop%20API.postman_collection.json](http://localhost:3000/Online%20Shop%20API.postman_collection.json).

2. **Import to Postman**:
    - Open Postman.
    - Click on "Import" at the top left.
    - Choose the downloaded file or drag it into the Postman window.

   This collection provides a set of predefined requests organized into folders for user-related, product-related, and category-related operations, configured to use with the local development environment.

3. **Setup Environment Variables**:
    - After importing the collection, ensure to set up Postman environment variables for `url` and `jwt_token`.
    - `url`: [http://localhost:3000](http://localhost:3000)
    - `jwt_token`: Ensure to update this variable after obtaining a token through user registration/login.

Now, you're all set to explore, test, and interact with the APIs!


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


## GraphQL Authorization and Usage

### Authorizing Your GraphQL Requests

After obtaining the JWT token from the REST API (by registering a new user or logging in), you need to add it to your GraphQL requests to access protected routes.

1. **Obtain JWT Token**: Utilize the REST API to obtain the JWT token by registering or logging in via Postman using the provided collection.

2. **Add to GraphQL Playground**:
    - Navigate to [http://localhost:3000/graphql](http://localhost:3000/graphql).
    - On the bottom left, find the "HTTP HEADERS" tab and insert your token like so:
      ```json
      {
        "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
      }
      ```
   Replace `YOUR_JWT_TOKEN_HERE` with the token you obtained.


### Sample Queries and Mutations

#### Queries

1. **Fetch All Categories**
   ```graphql
   query {
     categories {
       id
       name
     }
   }
   ```

2. **Fetch Specific Category**
   ```graphql
   query {
     category(id: 1) {
       id
       name
     }
   }
   ```

3. **Fetch Products by Category**
   ```graphql
   query {
     productsByCategory(categoryId: 1) {
       id
       name
       price
     }
   }
   ```

4. **Fetch Specific Product**
   ```graphql
   query {
     product(id: 1) {
       id
       name
       price
     }
   }
   ```

#### Mutations

1. **Create a New Category**
   ```graphql
   mutation {
     createCategory(createCategoryData: { name: "Electronics" }) {
       id
       name
     }
   }
   ```

2. **Create a New Product**
   ```graphql
   mutation {
     createProduct(createProductData: { categoryId: 1, name: "Laptop", price: 1000 }) {
       id
       name
       price
     }
   }
   ```

3. **Update a Product**
   ```graphql
   mutation {
     updateProduct(id: 1, updateProductData: { name: "Updated Laptop", price: 900 }) {
       id
       name
       price
     }
   }
   ```

4. **Delete a Product**
   ```graphql
   mutation {
     deleteProduct(id: 1)
   }
   ```
