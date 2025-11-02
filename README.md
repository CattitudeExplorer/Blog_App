SmartArt Blog
A simple and elegant blog application built with Node.js, Express, and EJS, allowing users to create, edit, delete, and 
view blog posts. It also includes a contact form and dynamic rendering for posts with and without HTML content.

Features:
- Create, view, edit, and delete blog posts
- Pre-loaded example posts (Chocolate Cake & Cheesecake recipes)
- Contact page with form and “Thank You” confirmation page
- Simple front-end interactions using vanilla JavaScript
- EJS structure with reusable header and footer partials
- Clean responsive UI styled with custom CSS

Technologies Used:
- Node.js (server-side runtime)
- Express.js 
- EJS (templating engine)
- Body-parser (form parsing)
- Method-Override (for PUT/DELETE methods)
- HTML5 / CSS3 / JavaScript

Installation and Setup:
1. Clone the repository:  git clone https://github.com/YourUsername/SmartArt-Blog.git
2. Install:
    npm Install
3. Run the server:
    node index.js
4. Open in browser:
    https://localhost:3000


Usage:
- Home Page displays all posts
- New Post allows creation of new posts
- Click on a post title to view it fully
- In any post that is fully viewed you can Edit or Delete that post
- Contact form send a message and shows a Thank You page.
- All posts are stored in memory (not persisted to a database yet).

