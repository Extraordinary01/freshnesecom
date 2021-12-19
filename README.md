# "Freshnesecom" eCommerce project

This is simple eCommerce project for my portfolio.
Design copyrights goes to [Petr Bilek](https://petrbilek.com "Petrbilek").

#### Backend

Backend was developed using Django and DRF. It includes simple authentication/authorization/registration system with token authentication on frontend and email confirmation on registration and password reset.

#### Frontend

In frontend I used Vue 3 with Composition API. Original design doesn't include signup, login, user profile pages, so I made it by myself. Maybe it looks not really good but, I'm not a designer and I prefer backend development. Almost all elements of frontend are active and you can test it freely.
Example:

- Products by tag, category
- Best selling products
- Filters for products (brand filter, rating filter, price filter)
- Cart
- User's wishlist
- Checkout (p.s. couldn't test checkout, because stripe gives me network error, I need VPN for testing it)
- Blog
- Posts by tag, category and date and many other features.

#### Site deployment

Backend locates at [Pythonanywhere](https://pythonanywhere.com) and frontend locates at [Github](https://extraordinary01.github.io/freshnese-vue/). For deploying frontend, I created second [repo](https://github.com/Extraordinary01/freshnese-vue)
