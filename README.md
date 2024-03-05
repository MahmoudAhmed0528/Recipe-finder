# Recipe Finder

Recipe Finder is a web application that allows users to browse, search, and manage recipes. Users can create an account, log in, and add their own recipes to share with others. The application also provides features for editing and deleting recipes.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication: Users can create an account, log in, and log out.
- Recipe management: Users can add, edit, and delete their own recipes.
- Responsive design: The application is optimized for use on both desktop and mobile devices.

## Technologies Used

- Frontend:

  - React.js: JavaScript library for building user interfaces.
  - Tailwind CSS: Utility-first CSS framework for styling.
  - Apollo Client: GraphQL client for managing data fetching and state management.
  - React Router: Library for routing and navigation in React applications.

- Backend:
  - Node.js: JavaScript runtime environment for running server-side code.
  - Express.js: Web application framework for building APIs.
  - GraphQL: Query language for APIs.
  - MongoDB: NoSQL database for storing recipe data.

## Installation

To run the Recipe Finder application locally, follow these steps:

1. Clone the repository:
   `git clone https://github.com/MahmoudAhmed0528/Recipe-finder`
2. Navigate to the project directory: `cd recipe-finder`
3. Install dependencies for the server and the client: `npm install`
4. Set up environment variables:

- Create a `.env` file in the `server` directory and add
  `JWT_SECRET=your_secret-key`
  `JWT_EXPIRATION=your_expiration_key`

5. Seed the database: `npm run seed`
6. Start the App: `npm run develop`
7. Open your web browser and navigate to http://localhost:3000 to view the application

## Usage

1. Browse `Home` to see all recipies and can filtering by category.
2. Click view details to see recipe details.
3. Create an account or log in using an existing account.
4. Browse `myrecipes` to see your recipies and add new recipes or edit/delete existing recipes.
5. Log out when finished.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit them (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
