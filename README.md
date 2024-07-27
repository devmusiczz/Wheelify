# AutoSwags

AutoSwags is a robust e-commerce application built with React, Next.js, Tailwind CSS, and Wix Headless CMS. The project leverages server actions and a headless CMS to provide a seamless shopping experience with a variety of features and functionalities.

## Tech Stack

- **React**
- **Next.js**
- **Tailwind CSS**
- **Wix Headless CMS**

## Features and Functionalities

### 1. Homepage
- **Slider:** A dynamic slider that changes every 5 seconds, with manual controls.
- **Featured Products:** Display products with a hover effect to change images too.
- **Category List:** Horizontal scrolling category list for easy navigation.

### 2. Product List Page
- **Fetching Products:** Retrieve product data from a headless database.
- **Pagination:** Navigation through multiple pages of products.
- **Filtering and Sorting:** Filter products by various criteria and sort by price or update date.
- **URL Query Updates:** Update search queries in the URL for easy sharing and saving.

### 3. Product Search
- **Search Functionality:** Ability to search for products by name.

### 4. Single Product Page
- **Product Images:** Display multiple images for a product with selection capability.
- **Product Information:** Detailed information about the product.
- **Options Component:** Selectable product options (e.g., color, size) with stock validation.
- **Stock Alerts:** Show stock levels and disable out-of-stock options.
- **Quantity Selector:** Control purchase quantity with a limit based on stock.
- **User Reviews:** Display user reviews and allow users to leave reviews after purchase.

### 5. Cart Functionality
- **Add to Cart:** Add products to the cart and update the cart icon.
- **Cart Management:** View, edit, and remove items in the cart.
- **Persistent Cart:** Store cart items for non-logged-in users using a visitor token.

### 6. Checkout Process
- **Guest Checkout:** Allow users to purchase without logging in by providing the necessary details.
- **Payment Options:** Support multiple payment methods and providers.
- **Order Summary:** Redirect to a success page with order details after payment.
- **Order Confirmation Email:** Send order details via email.

### 7. User Authentication
- **User Registration:** Create a new account with email verification.
- **Login and Logout:** Authenticate using email and password, with logout functionality.
- **Password Reset:** Send password reset emails and allow password updates.

### 8. User Profile
- **Profile Management:** Update user information and view order history.
- **Saved Details:** Auto-fill checkout information for logged-in users.

### 9. Backend Integration
- **Wix Headless CMS:** Use Wix's headless CMS for backend management.
- **Product Management:** Create, manage, and track products, discounts, and inventory.
- **Order Tracking:** Track orders, manage abandoned carts, and send reminder emails.
- **Sales Reporting:** View sales reports, payments, and invoices.
