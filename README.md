# Library Management System 📚

## Introduction

The Library Management System is a comprehensive solution for managing a library's various operations, built with React, TypeScript, Tailwind, Redux, and Vite.js. It is designed to simplify the process of borrowing, returning, loaning of books, making/canceling reservations, managing books, with RBAC.

### Features

- **User Interface**: Sleek and modern UI built with Tailwind.
- **Borrowing and Returning**: Easy process for users to borrow and return books.
- **Loaning of Books**: Simplified loaning mechanism for authorized users.
- **Making/Canceling Reservations**: Handle reservations for popular books.
- **CRUD Books**: Complete control over book creation, retrieval, update, and deletion.
- **Manage Users and Roles**: Robust User Management and Role-Based Access Control.

## Getting Started

Below are the instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (>=12.0.0)
- npm or Yarn

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ForAeons/lms-frontend.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd lms-frontend
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   # or using Yarn
   yarn install
   ```

4. **Setting Up Environment**:
   Make a copy of `.env.example` and rename to `.env.development`:  
   Then, update the `.env.development` file with the appropriate values if necessary.

5. **Start the Development Server**:

   ```bash
   npm run dev
   # or using Yarn
   yarn dev
   ```

The application should now be running at `http://localhost:3000/`.

## Setting Up Development Environment

- Install Go if you haven't already. You can download it from [here](https://go.dev/doc/install).
- Install Captain Githook (for running pre-commit/pre-push hooks):

  ```bash
  go install github.com/swellaby/captain-githook
  ```

- Install ESLint and Prettier extensions for your code editor.

## Documentation

Further documentation can be found in the [docs](./docs) directory.

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.
