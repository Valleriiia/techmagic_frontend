# TechMagic Frontend

This is the frontend part of a web application for managing equipment, repairs, and users. The project is built with **Angular 17** using **Angular Material**.

## Project Description

This application provides an interface for administering technical resources. It allows authorized users to view and manage machines and repairs, while administrators can manage user accounts.

Key Features:

* **Authentication:** User login and registration.
* **Role-Based Access Control:** Distinction between access rights (Standard Users vs. Administrators).
* **Equipment Management (Machines):** View lists, machine details, add, edit, and delete machines.
* **Repair Management (Repairs):** Track and manage repair works.
* **Repair Types:** Manage the directory of repair types.
* **User Management:** Functionality for administrators to view and edit users.

## Tech Stack

* **Framework:** Angular 17.3.17
* **UI Component Library:** Angular Material 17.3.10
* **Routing:** Angular Router (Component lazy loading)
* **HTTP Client:** Angular HttpClient (with auth interceptor)
* **State/Async:** RxJS

## Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/)
* [Angular CLI](https://github.com/angular/angular-cli): `npm install -g @angular/cli`

## Installation and Running

1. **Clone the repository:**
```bash
git clone <your-repository-url>
cd techmagic_frontend

```


2. **Install dependencies:**
```bash
npm install

```


3. **API Configuration:**
The application expects the Backend server to be running at `http://localhost:3000/api`. Ensure your server is started before running the frontend.
4. **Run the local development server:**
```bash
npm start
# or
ng serve

```


Open your browser at `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Page Structure

The application has the following routing structure:

| Path | Description | Access |
| --- | --- | --- |
| `/dashboard` | Main dashboard | Authorized |
| `/machines` | Equipment list | Authorized |
| `/machines/:id` | Specific machine details | Authorized |
| `/repair-types` | Repair types directory | Authorized |
| `/repairs` | Repairs log | Authorized |
| `/users` | User management | **Admin Only** |
| `/auth` | Login/Registration page | Public |

## Security and Access Rights

* **Auth Guard:** Blocks access to protected pages for unauthorized users.
* **Admin Guard:** Ensures access to the `/users` page is restricted to users with the `admin` role.
* **`appAdminOnly` Directive:** Used in templates to hide UI elements from users without administrator privileges.

## Testing

To run Unit tests (using Karma and Jasmine):

```bash
npm test

```

## Build

To build the project for production (artifacts will be stored in the `dist/` directory):

```bash
npm run build

```
