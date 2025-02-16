# Project
This is a simple web project using Role-Based-Access-Ctronl (RBAC) from an online database hosted on aiven.io

# Tech Stack
**Client**: EJS templates, express ejs layouts
**Server**: Node, ExpressJs
**Auth**: PassportJS, Passport-local strategy
**Database**: mysql, aiven cloud hosting(mysql support)
**ORM**: Sequelize

# Run locally

Clone the project 

`git clone https://github.com/yosmelchiang/sequelize_database.git`

Go to the project directory

`cd sequelize_database`

Install dependencies
`npm install`

Create .env file and add Environment Variables
`touch .env`

Start the server
`npm start`

# Features
- Animals page and option to add a new animal
- Species page
- User login/logout and user details page

# Environment Variables
PORT="your_db_port"
DB_NAME="your_db_name"
DB_USER="your_db_user"
DB_PASSWORD="your_db_password"
DB_DIALECT="mysql"

# Authors
- [@yosmelchiang](https://www.github.com/yosmelchiang)

# License
- [MIT](https://www.choosealicense.com/licenses/mit)
