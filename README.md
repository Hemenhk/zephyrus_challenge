# Multi-Project Repository

This repository contains three distinct projects, each serving a different purpose and showcasing different technologies. Below is an overview of the projects:

- **[Task-1](#task-1)**: A static website built with HTML, CSS, and JavaScript.
- **[Task-2](#task-2)**: A full-stack application using Next.js and Node.js (Express).
- **[Task-3](#task-3)**: A Next.js project that fetches and displays data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/).

---

## Project Structure

```plaintext
.
├── task-1/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── assets/
│       └── ...
├── task-2/
│   ├── backend/
│   │   ├── src/
            └── controllers/
                 └── factoryController.ts
                 └── taskController.ts
            └── models/
                 └── task.ts
            └── routes/
                └── taskRoutes.ts
            └── utils/
                └── catchAsync.ts
            └── server.ts
│   ├── frontend/
│   │   ├── app/
│   │   └── axios/
│   │   └── components/
│   │   └── hooks/
│   │   └── lib/
│   │   └── providers/
│   ├── package.json
│   └── ...
├── task-3/
│   │   ├── app/
│   │   └── axios/
│   │   └── components/
│   │   └── hooks/
│   │   └── lib/
│   │   └── providers/
│   ├── package.json
│   └── ...
└── README.md
```


### How to Start the Server for Task-1

To serve the `index.html` file of Task-1 locally, you can use any static file server. Below are a few options:

#### Option 1: Using VS Code Live Server Extension
1. Install the **Live Server** extension in Visual Studio Code.
2. Open the `task-1` directory in VS Code.
3. Right-click on `index.html` and select **Open with Live Server**.
4. The site will open in your default web browser.

#### Option 2: Using Python's Built-in HTTP Server
1. Ensure Python is installed on your system.
2. Navigate to the `task-1` directory in your terminal:
   ```bash
   cd task-1 python -m http.server 8000


### Task-2: Express and TypeScript Backend

The backend for Task-2 is built using **Express.js** and **TypeScript**. I used MongoDB for my database to persist the data and mongoose to set up the schemas. I created reusable controllers to easily scale the backend if needed. The back end offers full CRUD functionality.


#### How to Start the Server
1. Navigate to the `task-2` directory:
   ```bash
   cd task-2


2. Navigate to the `backend` directory:
   ```bash
   cd backend

3. Start the development server:
   ```bash
   npm run dev

The server should now be running. You can access it at the specified host and port (e.g., http://localhost:5000 by default).

#### Tech Used

1. NodeJS
2. ExpressJS
3. MongoDB with mongoose
4. Typescript


### Task-2: NextJS Frontend

The front for Task-2 is built using **Next.js** and **TypeScript**. I used tanstack to cache all data, and trigger revalidation of data when a mutation has occured. I used a filtering system to filter between completed and not completed tasks. The front end offers full CRUD functionality.

#### How to Start the Server
1. Navigate to the `task-2` directory:
   ```bash
   cd task-2


2. Navigate to the `frontend` directory:
   ```bash
   cd frontend

3. Start the development server:
   ```bash
   npm run dev

The server should now be running. You can access it at a port (e.g., http://localhost:3000 by default).

#### Tech Used

1. Next.js
2. Tanstack Query
3. Axios
4. Typescript
5. Shadcn UI
6. Date FNS
7. Tailwind CSS
8. React Hook Form
9. Zod with resolver


### Task-3: NextJS and External API

The front for Task-2 is built using **Next.js** and **TypeScript**. It uses tanstack to prefetch the data on the server to instantly render the posts. I added two filters: one for title and one for id. The filtering uses a custom debounce hook, to wait .5 seconds after the user has finished typing to filter.

#### How to Start the Server
1. Navigate to the `task-3` directory:
   ```bash
   cd task-2

3. Start the development server:
   ```bash
   npm run dev

The server should now be running. You can access it at a port (e.g., http://localhost:3000 by default).

#### Tech Used

1. Next.js
2. Tanstack Query
3. Axios
4. Typescript
5. Shadcn UI
6. Tailwind CSS
7. JSON placeholder data