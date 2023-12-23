# Task Management Application

## Description
Task Management Application API

## Table of Content

- [System Setup](#system-setup)
- [Installation](#installation)
- [Endpoints](#endpoints)
- [Documentation](#documentation)

### System Setup
Your system will need to have the following software installed:

  * [Node](https://nodejs.org/en/download/)
  * [Mysql](https://www.mysql.com/)

## Installation
#### Step 1: Clone the repository

```bash
git clone https://github.com/ogbon/Task_Management_API.git
cd Task_Management_API
```

```bash
git clone git@github.com:ogbon/Task_Management_API.git
cd Task_Management_API
```

#### Step 2: Setup database
Create a new mysql database and tables

#### Step 3: Setup environment variables
Copy `.env.sample` to `.env` i.e `cp .env.sample .env`
Update the environment variables

#### Step 4: Install NPM packages
```bash
npm i
```
#### Step 5: Start in development mode
```bash
npm run dev
```
### API Endpoints

| METHOD | DESCRIPTION                             | ENDPOINTS                                              |
| ------ | --------------------------------------- | ------------------------------------------------------ |
| POST   | Sign up a user                          | `/auth/sign-up`                                        |
| POST   | Login a user                            | `/auth/login`                                          |
| POST   | Create a new task                       | `/tasks`                                               |
| GET    | Get a task                              | `/tasks/:id`                                           |
| GET    | Get user tasks                          | `/tasks/user?page[number]=${value}&page[size]=${value}`|
| GET    | Get all tasks                           | `/tasks?page[number]=${value}&page[size]=${value}`     |
| PUT    | Update a task                           | `/tasks/:id`                                           |
| PUT    | Update task status                      | `/tasks/:id/status`                                    |
| DELETE | Delete a task                           | `/tasks/:id`                                           |


### Documentation
Insert the port number you used in the position where `port` is written in documentation url.

The API documentation is available [here](http://localhost:port/docs/).
