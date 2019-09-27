# What Is Store-Restful-API?
A Store_Restful_API is a RESTFUL API for e commerce application

# How to use it?
Clone or download this repository, then open the directory in your terminal
```bash
$ git clone https://github.com/pandusudo/Store-Restful-API.git
$ npm install
```

import point_of_sales.sql to your mysql database

If the installation is done then run
```bash
$ npm test
```

Open postman then type http://localhost:3333/api/products with get method in URL.

# Features
- Get All products
- Add product
- Reduce product
- Delete product
- Edit Product
- Login with JWT
- Register
- Get all categories
- Add categories
- Delete categories

# API List
### Product
- **/products** with get method to get all products
- **/products** with post method to add product (Login required)
- **/products/:id** with delete method and id parameter to delete product (Login required)
- **/products/:id** with put method and id parameter to update product (Login required)
- **/products/reduce/:id** with post method and id parameter to reduce product quantity (Login required)

### Category
- **/categories** with get method to get all categories
- **/categories** with post method to add category (Login required)
- **/categories/:id** with delete method and id parameter to delete category (Login required)
- **/categories/:id** with put method and id parameter to update category (Login required)

### User
- **/users** with get method to get all users (Login required)
- **/users/register** with post method to Register
- **/users/login** with post method to Login (You will get a token)
- **/users/:id** with put method to update user (Login required)
- **/users/:id** with delete method to delete user (Login required)
