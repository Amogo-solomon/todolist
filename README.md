# todolistapp
Todo List Application
Overview
This Todo List Application is designed to help users manage their tasks efficiently. It features user authentication, a responsive design, and an admin page for managing todos. The application uses React with Vite for fast development, Tailwind CSS for styling, and React Router for navigation.

Features
User Authentication: Secure login system with JWT.
Todo Management: Add, mark as completed, and remove todos.
Admin Access: Special admin page with access to all todos.
Responsive Design: Ensures a seamless experience across all devices.
Technologies Used
React: Frontend framework.
Vite: Development server and build tool.
Tailwind CSS: Styling framework.
React Router: Navigation and routing.
Jest & React Testing Library: Unit testing.
Setup and Running the Application
Prerequisites
Node.js (>=14.x)
npm or yarn

Installation:
git clone https://github.com/your-username/todo-list-app.git
cd todo-list-app

Install Dependencis
npm install
or if you prefer yarn
yarn install


Run the Development Server
npm run dev

or yarn dev


Running Tests
To run the unit tests, use the following command:
npm test

yarn test

Assumptions and Decisions
Admin Credentials: Admin credentials are stored in a JSON file (src/adminCredentials.json).
API Integration: Integrated with JSONPlaceholder for demo data.
State Management: Used React's useState and useEffect hooks for state management.
Branching Strategy
This project follows the Git Flow branching strategy:

Main Branch: main - Contains production-ready code.
Development Branch: develop - Contains the latest development code.
Feature Branches: feature/<feature-name> - Used for developing new features. Branch off from develop.
Release Branches: release/<version> - For preparing new releases. Branch off from develop.
Hotfix Branches: hotfix/<issue> - For quickly fixing bugs in production. Branch off from main.
