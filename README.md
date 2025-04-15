# Node.js MVC Task Manager

A sample MVC (Model-View-Controller) application built with Node.js, Express, MongoDB, Mongoose, and EJS templating engine.

## Features

- Full CRUD functionality for task management
- MVC architecture for clean code organization
- MongoDB integration with Mongoose ODM
- Responsive UI with Bootstrap
- Form validation
- Sorting and filtering options
- RESTful API design

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Sankalp-Sachapara/node-mvc-sample.git
   cd node-mvc-sample
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a .env file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/mvc_sample
   PORT=3000
   ```

4. Start MongoDB service:
   ```
   # On Windows
   net start MongoDB

   # On macOS
   brew services start mongodb-community

   # On Linux
   sudo systemctl start mongod
   ```

5. Run the application:
   ```
   # For development (with nodemon)
   npm run dev

   # For production
   npm start
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
node-mvc-sample/
│
├── app.js                  # Application entry point
├── package.json            # Project dependencies and scripts
├── .env                    # Environment variables (create this)
├── .gitignore              # Git ignore file
│
├── models/                 # Database models
│   └── Task.js             # Task model
│
├── controllers/            # Request handlers
│   └── taskController.js   # Task controller
│
├── routes/                 # Application routes
│   └── taskRoutes.js       # Task routes
│
├── views/                  # EJS templates
│   ├── layout.ejs          # Main layout template
│   ├── 404.ejs             # 404 page template
│   ├── error.ejs           # Error page template
│   ├── partials/           # Partial templates
│   │   ├── header.ejs      # Header partial
│   │   └── footer.ejs      # Footer partial
│   │
│   └── tasks/              # Task-related templates
│       ├── index.ejs       # Task list page
│       ├── create.ejs      # Create task page
│       ├── edit.ejs        # Edit task page
│       └── show.ejs        # Single task page
│
└── public/                 # Static files
    ├── css/                # CSS files
    │   └── style.css       # Custom styles
    └── js/                 # JavaScript files
        └── main.js         # Client-side JavaScript
```

## MVC Pattern Explanation

This application follows the MVC (Model-View-Controller) architectural pattern:

- **Models**: Define the data structure and handle database operations. Located in the `models/` directory.
- **Views**: Handle the presentation layer using EJS templates. Located in the `views/` directory.
- **Controllers**: Process incoming requests, interact with models, and return appropriate views. Located in the `controllers/` directory.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /tasks | Get all tasks |
| GET    | /tasks/create | Render task creation form |
| POST   | /tasks | Create a new task |
| GET    | /tasks/:id | Get a specific task |
| GET    | /tasks/:id/edit | Render task edit form |
| PUT    | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |
| PATCH  | /tasks/:id/toggle | Toggle task completion status |

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [EJS](https://ejs.co/)
- [Bootstrap](https://getbootstrap.com/)