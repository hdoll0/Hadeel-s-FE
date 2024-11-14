# Project: E-Commerce Website - Frontend

This is the frontend for our e-commerce website, designed to deliver a smooth user experience while seamlessly connecting to the backend. This project is built with React and relies on Axios for API calls and React Router DOM for navigation.

# Features

This e-commerce frontend provides the following key features:

### Level 1: Basic Requirements

**Pages to Create:**

1. Home page: Displays a title and a "Shop Now" button directing visitors to the product page.
2. Product page: Lists all available products, with filtering and search options.
3. Product Detail: Displays detailed information about each product.
4. Dashboard page: Admin-only page providing access to manage products, users, orders, and categories.

**Functionalities for a Visitor:**

- Get list of products: Visitors can browse all available products on the product page.
- Search products: Search functionality allows visitors to search products by name.
- Filter products: Price filter allows users to filter products within a specified price range.
- Add products to a cart: Visitors can add products to their cart.
- Remove products from a cart: Visitors can remove products from their cart.

**Functionalities for an Admin:**

- Add a new product: Admins can add new products via the dashboard.
- Update a product: Admins can edit details of existing products.
- Remove a product: Admins can delete products.

### Level 2: Additional Requirements

**Authentication:**

- User Registration and Login: Users can register and log in with email and password.
- Route Protection: Specific routes are accessible only to logged-in users, and certain pages (like the dashboard) are restricted to admin users.

**Functionalities for an Admin:**

- List all users: Admins can view a list of all registered users on the User Dashboard.
- Delete a user: Admins can delete users as needed.
- List all orders: Admins can view all user orders and order details on the Order Dashboard.

### Level 3: Bonus Requirement (Optional)

- Loading, Success, and Error Messages: The app displays loading indicators, success, and error messages for actions such as loading product lists or adding a product.
- Pagination: The product list includes pagination to manage large sets of products.
- User Profile Page: Available to logged-in users, this page allows users to view and edit their profile details, including updating their name.

---

# General Features (App.js)

- Dynamic Routing: Utilizing React Router DOM to handle routes for various pages (home, products, cart, wishlist, profile, and admin dashboard).
- Error Handling: Integrated error boundary for displaying custom error messages.
- Persistent Cart & Wishlist: Items in the cart and wishlist are stored locally, allowing data to persist across sessions.

# Product Features

- Product Browsing: Users can view and search through available products, with sorting and filtering options for prices.

- Product Detail View: Each product page displays details like the image, name, description, and price.

  - Endpoint: GET http://localhost:5125/api/v1/products
  - Product Detail Endpoint: GET http://localhost:5125/api/v1/products/{productId}

- Wishlist Management: Users can add/remove products from their wishlist, and changes are stored persistently in local storage.
  - URL: /wishlist

# Cart Features

- Cart Management: Users can add products to the cart, adjust quantities, and remove items.

- Order Summary: Users see the subtotal.

- Checkout Process: Upon checkout, orders are created
  - Order Endpoint: POST http://localhost:5125/api/v1/order

# User Features

- Protected Routes: Ensures only authenticated users (and optionally, admin users) can access specific routes, like profile and admin dashboard.

- User Registration: New users can sign up with their details, including email, password, name, and phone number.

  - Registration Endpoint: POST http://localhost:5125/api/v1/user/signup

- User Login: Existing users can sign in, and their tokens are saved in local storage to maintain their session.

  - Login Endpoint: POST http://localhost:5125/api/v1/user/signin

- Profile Management: Users can view and edit their profile information, including changing their name.

  - Profile Update Endpoint: PUT http://localhost:5125/api/v1/user/{userId}

- Logout Functionality: Users can log out of their account, clearing their session data from local storage.
  - URL: /profile

# Order Features

- Order History: Users can view their past orders, which display order details, total price, and date.

  - Order History Endpoint: GET http://localhost:5125/api/v1/order/user/{userId}

- Order Details: Within each order, users can expand to see individual items, including quantity and price.

# Dashboard Features

Dashboard Overview

- Admin Dashboard: Central page with links to individual dashboards for Products, Users, Categories, Coupons, and Orders.

  - URL: /dashboard

  **Product Dashboard**

  - View, Create, Update, Delete Products: Lists all products with options to create, edit, or delete. Includes filtering by category and setting prices, images, and descriptions.
    - Endpoints:
      - Fetch Products: GET http://localhost:5125/api/v1/products?limit=1000&offset=0
      - Create Product: POST http://localhost:5125/api/v1/products
      - Update Product: PUT http://localhost:5125/api/v1/products/{productId}
      - Delete Product: DELETE http://localhost:5125/api/v1/products/{productId}
      - URL: /product-dashboard

  **User Dashboard**

  - View and Delete Users: Lists all registered users and provides an option to delete a user.
    - Endpoints:
      - Fetch Users: GET http://localhost:5125/api/v1/user?limit=1000&offset=0
      - Delete User: DELETE http://localhost:5125/api/v1/user/{userId}
      - URL: /user-dashboard

  **Category Dashboard**

  - View, Create, Update, Delete Categories: Lists all categories with options to create new categories or edit and delete existing ones.
    - Endpoints:
      - Fetch Categories: GET http://localhost:5125/api/v1/category
      - Create Category: POST http://localhost:5125/api/v1/category
      - Update Category: PUT http://localhost:5125/api/v1/category/{categoryId}
      - Delete Category: DELETE http://localhost:5125/api/v1/category/{categoryId}
      - URL: /category-dashboard

  **Order Dashboard**

  - View Orders and Details: Displays all user orders with expandable views to see item details (product Id and Name, quantity, price).
    - Endpoints:
      - Fetch Orders: GET http://localhost:5125/api/v1/order
      - URL: /order-dashboard

# Tech Stack

**Frontend**

- React: For building the user interface.
- Axios: To interact with backend APIs.
- React Router DOM: For seamless client-side navigation.
- Material UI: For styling and UI components.

**Backend Integration**

- The frontend connects with the backend via CORS (Cross-Origin Resource Sharing), using the same endpoint with Axios for all data-related requests.

**Project Structure**

- Components:

  - Product Components: Product cards, product detail pages, and pagination.
  - Cart Components: Cart item and summary with integrated discount and payment selection.
  - User Components: Protected route, registration, login, and profile management.
  - Order Components: Order history and details with expandable views.
  - Wishlist Components: Wishlist items and overview page.
  - Dashboard Components: Admin controls for managing users, products, orders, and categories.
  - Reusable Components: Forms, error boundaries, and layout elements.

- Pages:
  - Home: Showcases featured products.
  - Product List: Displays products with search and filter options.
  - Product Details: Shows detailed product information, reviews, and related products.
  - Cart: Allows users to view and manage items.
  - Wishlist: Displays products added to the wishlist.
  - Order Dashboard: Admin dashboard for managing orders.
