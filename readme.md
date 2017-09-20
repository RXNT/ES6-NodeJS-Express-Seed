<!-- TOC -->

- [Getting Started](#getting-started)
- [Create new Student API using MongoDB](#create-new-student-api-using-mongodb)
- [Create new Student API using SqlServer](#create-new-student-api-using-sqlserver)
- [All Commands](#all-commands)
- [Configuration](#configuration)
- [Notes on older ES6 seed (pre October 2017)](#migrating)

<!-- /TOC -->

# Getting Started

- Clone the repo in your working directory

- Run service with development environment
  ```bash
  yarn start
  ```

- NOTE: Due to incompatibilities with babel and node, and the maturity of Node's ES6 support, this project does not use babel.

- Reference node.green for EcmaScript features that you're allowed to use. http://node.green/ . This project is designed to work with node 6.11.3 or higher. Node 6.11.3 supports 99% of ES6 syntax - everything except ES6 modules (import & export) will be OK, please use standard Node commonJS modules instead. If you choose a newer version, reference node.green to verify which features are allowed. (Node is planning to release support for ES6 modules in winter 2017 - reference node.green to confirm before using this feature.)

# Create new Student API using MongoDB

We will follow the instructions by adding a `Student` registration API which will connect to mongodb

1. Create mongodb collection model under `api\models` folder

2. load model created in `step(1)` in `api\models\index` (use commonJS, e.g. let ex = require('ex.js'))

3. Add new validator file under `api\validators\student.validators.js` to implement request validation using `Joi`

   a. Export a method named as `validateRegisterStudent`

4. Add new controller under `api\controllers` folder with file name as `student.controller.js`

   a. Export a method named as `registerStudent`

   b. Before processing request, validate request object by importing validator method created in `step (3)`

   c. If valid request, process request with required logic

5. Define API route path for new method under `api\app.constants.js` as below

   `module.exports.studentController = {
      routeName: '/students',
      routeMethods: {
        registerStudentRoute: '/registerStudent',
      },
    };`

6. Create new route file under `api\routes\student.route.js`. Attach route path(defined in `step-5`) and controller method(defined in `step-4`) as below

    `let express = require('express');`

    `let studentCtrl = require('../controllers/student.controller');`

    `let appConstants = require('../app.constants');`

    `const router = express.Router();`

    `router.route(appConstants.studentController.routeMethods.registerStudentRoute).post(studentCtrl.registerStudent);`

7.  load route file(defined in `step-6`) in `api\routes\index.route.js` file and attach route

    `let studentRoutes = require('./student.route');`

    `router.use(appConstants.studentController.routeName, studentRoutes);`

# Create new Student API using SqlServer

We will follow the instructions by adding a `Student` registration API which will connect to mongodb

1. Add new `student.dal.js` file under `api\dal` folder

   a. Export a method named as `registerStudent`

2. Add new validator file under `api\validators\student.validators.js` to implement request validation using `Joi`

   a. Export a method named as `validateRegisterStudent`

3. Add new controller under `api\controllers` folder with file name as `student.controller.js`

   a. Export a method named as `registerStudent` using commonJS (module.exports.X = Y)

   b. Before processing request, validate request object by importing validator method created in `step (3)`

   c. If valid request, process request with required logic by consuming method created in `step-1`

4. Define API route path for new method under `api\app.constants.js` as below

   `module.exports.studentController = {
      routeName: '/students',
      routeMethods: {
        registerStudentRoute: '/registerStudent',
      },
    };`

5. Create new route file under `api\routes\student.route.js`. Attach route path(defined in `step-5`) and controller method(defined in `step-4`) as below

    `let express = require('express');`

    `let studentCtrl = require('../controllers/student.controller');`

    `let appConstants = require('../app.constants');`

    `const router = express.Router();`

    `router.route(appConstants.studentController.routeMethods.registerStudentRoute).post(studentCtrl.registerStudent);`

6.  load route file(defined in `step-6`) in `api\routes\index.route.js` file and attach route

    `let studentRoutes = require('./student.route');`

    `router.use(appConstants.studentController.routeName, studentRoutes);`

# All Commands
- Test - runs mocha tests with name test/XXX.spec.js
  ```bash
  yarn test
  ```
- Start service in development environment
  ```bash
  yarn run start
  ```
- Start/Stop service in `devQA` environment.
  ```bash
  yarn run startdevqa
  yarn run stopdevqa
  ```
- Start/Stop service in `prodQA` environment
  ```bash
  yarn run startprodqa
  yarn run stopprodqa
  ```
- Start/Stop service in `prodRelease` environment
  ```bash
  yarn run startprodrelease
  yarn run stopprodrelease
  ```
- Get outdated packages information
  ```bash
  yarn run getoutdatedpackages
  ```

# Configuration

- There is different configuration file for every environment which can be found under `config` folder.
- Below attributes can be configured in every `config` file
  - port - In which port we are interested to start service
  - secureCommunication - Whether to use SSL for service or not
  - mongoConnectionString - MongoDB connection string
  - sqlConnectionString - SQL Server connection string

# Notes on older ES6 seed (pre October 2017)

- The previous version of this repository relied on transpiling of babel code. In order to start production scripts with the previous version, it was necessary to navigate to the transpiled code folder (dist) then execute start commands. Debugging these scripts would have revealed transpiled code... To run this version, transpiling is not used (babel is not used). Simply run the start scripts from the project home directory. Errors and debugging will point to raw source code.

- Mongoose-aliasfield was deprecated by the creator and has been replaced in this project with mongoose's new built-in alias functionality. This works slightly differently from aliasfield. See companymongo.controller.js for more information.

- Husky is used instead of ghooks. Ghooks was deprecated by it's creator in favor of husky.

- Node config is now used. This means NODE_ENV must be set before running scripts. NODE_ENV is set by your execute/process.X.json scripts, and also in package.json by your development and test scripts.

- Bluebird and promise polyfills are removed. Node 6.11.3 and greater support ES6's built-in Promise.

- Mocha testing is supported, and istanbul runs automatically when testing. 
