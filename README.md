# Project
This is a simple web project we have been playing with in class using Role-Based-Access-Ctronl (RBAC), sequelize and passporJs.

# Tech Stack
- **Client**: EJS templates, express ejs layouts
- **Server**: Node, ExpressJs
- **Auth**: PassportJS, Passport-local strategy
- **Database**: mysql, aiven cloud hosting(mysql support)
- **ORM**: Sequelize

# Run locally

## Clone the project 
```
git clone https://github.com/yosmelchiang/sequelize_database.git
```

## Go to the project directory
```
cd sequelize_database
```

## Install dependencies
```
npm install
```

## Create .env file
```
touch .env
```

# Add environment Variables
```
PORT=your_host_port
DB_PORT=your_database_port
DB_HOST=your_database_host
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_DIALECT="mysql"
```

## Start the server
```
npm start
```

# Features
- View animals page and option to add a new animal (adding animals requires login)
- View current available species (fetched from database, does not support adding new species yet)
- Login with a current user or create one (role is set to User by default, Admin role has to be set in the database for now)
- View user details page

# Authors
- [@yosmelchiang](https://www.github.com/yosmelchiang)

# License
- [MIT](https://www.choosealicense.com/licenses/mit)
