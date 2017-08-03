<!-- TOC -->

- [Getting Started](#getting-started)
- [Create new Student API using MongoDB](#create-new-student-api-using-mongodb)
- [Create new Student API using SqlServer](#create-new-student-api-using-sqlserver)
- [All Commands](#all-commands)
- [Configuration](#configuration)

<!-- /TOC -->

# Getting Started

- Clone the repo in your working directory

- Run service with development environment
  ```bash
  yarn start
  ```

# Create new Student API using MongoDB

We will follow the instructions by adding a `Student` registartion API which will connect to mongodb

1. Create mongodb collection model under `api\models` folder

2. Import model created in `step(1)` in `api\models\index`

3. Add new validator file under `api\validators\student.validators.js` to implement request validation using `Joi`

   a. Export a method named as `validateRegisterStudent`

4. Add new controller under `api\controllers` folder with file name as `student.controller.js`

   a. Export a method named as `registerStudent`

   b. Before processing request, validate request object by importing validator method created in `step (3)`

   c. If valid request, process request with required logic

5. Define API route path for new method under `api\app.constants.js` as below

   `exports.studentController = {
      routeName: '/students',
      routeMethods: {
        registerStudentRoute: '/registerStudent',
      },
    };`

6. Create new route file under `api\routes\student.route.js`. Attach route path(defined in `step-5`) and controller method(defined in `step-4`) as below

    `import express from 'express';`

    `import studentCtrl from '../controllers/student.controller';`

    `import appConstants from '../app.constants';`

    `const router = express.Router();`

    `router.route(appConstants.studentController.routeMethods.registerStudentRoute).post(studentCtrl.registerStudent);`

7.  Import route file(defined in `step-6`) in `api\routes\index.route.js` file and attach route

    `import studentRoutes from './student.route';`

    `router.use(appConstants.studentController.routeName, studentRoutes);`

# Create new Student API using SqlServer

We will follow the instructions by adding a `Student` registartion API which will connect to mongodb

1. Add new `student.dal.js` file under `api\dal` folder

  a. Export a method named as `registerStudent`

2. Add new validator file under `api\validators\student.validators.js` to implement request validation using `Joi`

   a. Export a method named as `validateRegisterStudent`

3. Add new controller under `api\controllers` folder with file name as `student.controller.js`

   a. Export a method named as `registerStudent`

   b. Before processing request, validate request object by importing validator method created in `step (3)`

   c. If valid request, process request with required logic by consuming method created in `step-1`

4. Define API route path for new method under `api\app.constants.js` as below

   `exports.studentController = {
      routeName: '/students',
      routeMethods: {
        registerStudentRoute: '/registerStudent',
      },
    };`

5. Create new route file under `api\routes\student.route.js`. Attach route path(defined in `step-5`) and controller method(defined in `step-4`) as below

    `import express from 'express';`

    `import studentCtrl from '../controllers/student.controller';`

    `import appConstants from '../app.constants';`

    `const router = express.Router();`

    `router.route(appConstants.studentController.routeMethods.registerStudentRoute).post(studentCtrl.registerStudent);`

6.  Import route file(defined in `step-6`) in `api\routes\index.route.js` file and attach route

    `import studentRoutes from './student.route';`

    `router.use(appConstants.studentController.routeName, studentRoutes);`

# All Commands

- Start service in development environment
  ```bash
  yarn run start
  ```
- Transpile service from ES6 to ES5 for devQA Or prodQA or prodRelease environments
  ```bash
  yarn run build
  ```
- Start/Stop service in `devQA` environment.
  Naviagate to `dist` folder created in step (2) and execute below commands to start/stop service
  ```bash
  yarn run startdevqa
  yarn run stopdevqa
  ```
- Start/Stop service in `prodQA` environment
  Naviagate to `dist` folder created in step (2) and execute below commands to start/stop service
  ```bash
  yarn run startprodqa
  yarn run stopprodqa
  ```
- Start/Stop service in `prodRelease` environment
  Naviagate to `dist` folder created in step (2) and execute below commands to start/stop service
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