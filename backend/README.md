# Data Store Service

An Express.js backend service for storing, managing, and securing dynamic file resources such as user avatars, and assignment file submissions.

## Overview

The data store is a micro-service whose sole responsibility is to manage the storage, access, upload and removal of dynamic file resources such as user avatars and assignment file submissions. All files are stored in a directory specified by the environment variable **STORE_DIR**.

The subdirectory structure:
```bash
    |
    |__avatars
    |   |
    |   |_<Avatars>
    |
    |__courses
        |
        |__<courseId>
            |
            |__assignments
                |
                |__<assignmentId>
                    |
                    |__<Submissions>

```

## Dependencies

### Other Services

* This service depends on the **database service** for its functionality, and will fail to operate as expected without the proper configuration and deployment (as a Docker container) of the **database service**.
* The **authentication suite service** is also necessary as all routes require a valid JWT (JSON Web Token) to be sent as cookies or in the body of each request.

### Required Environment Variables

* This service requires the following environment variables to be defined (and valid) for it to properly run. Without these environment variables, the service may have unintended behaviors or fail to run entirely.

```dotenv
STORE_PORT="..." The port on which the HTTPS server for the service should accept connections. This should be a valid HTTPS port number.
HOST_NAME="..." # The hostname of the application, used in 'redirect' responses at API endpoints.
CRT_LOCATION="..." # The location of the service's .crt file, used in configuring the HTTPS server.
KEY_LOCATION="..." # The location of the service's .key file, used in configuring the HTTPS server.

STORE_DIR="..." # The (in-container if dockerized) directory to store all dynamic file resources.
STORE_KEY="..."

# (Optional) If not present or 'false', will designate that the application is in development mode. 
# Generally not necessary for environment configuration, but is present in the Docker compose configuration as a necessary flag.

IS_PRODUCTION="..."

# The configuration variables of the database.
MYSQL_HOST="..."
MYSQL_DB="..."
MYSQL_USER="..."
MYSQL_USER_PW="..."
```

> For more details about the environment variables the application as a whole requires, [see the app-level README.md file.](../README.md)

## Directories

### src - Source Directory

The source code files of the service.

#### `app.ts` - Core service file

Contains a function which initializes the express application, retrieves the router instances, activates logging middleware, and maps each router to its corresponding path.

#### `env.ts` - Core service file

A class which loads and initializes environment variables for the service to be used and imported throughout the source code.

* Additionally checks determines whether the service is in 'production' (deployed as a container) or 'development' (run as a local server) to determine where it should retrieve its environment variables from.

* This class also checks whether certain required environment variables are defined or not.

* Ultimately, exports the service's necessary environment variables for usage via import in other classes within the service.

#### `server.ts` - Core service file

The main entrypoint of the service. Creates the express application by calling on the function described in `app.ts`, initializes a database connection, and launches an HTTPS server using the service's credentials and the express application. This server then takes all incoming requests and makes all outgoing responses for the service.

#### routes - API Endpoint (Router Classes) Directory

Directory which contain router class files that themselves contain functions which map to RESTful API end points.

  * `AvatarRouter.ts` - A router class which contains API endpoints to enable and manage the retrieval, storage, removal, and access of user avatars. Each route verifies that a valid user token is recieved as a cookie with each request to authenticate users. Avatar uploads use these tokens to determine which user to overwrite the avatar file for. Size and file type checks are made with each upload requests. This route is accessed by the **user frontend service** and the **administrator frontend service** to retrieve profile photos for display in necessary webpages. This route is also accessed by the **backend service** to send upload and removal requests from the aformentioned directory. The **database service** is accessed by this service at times when determining where a user's avatar is located.
  * `SubmissionRouter.ts` - A router class which contains an API endpoints to enable and manage the retrieval, storage, removal, and access of assignment file submissions made by student users. Each route verifies that a valid user token is recieved as a cookie with each request to authenticate users. Additional checks are made to verify that the requester is allowed to access, remove, modify, or make a submission. This route is accessed by the **user frontend** to enable the retrieval of submissions for download. This route is also accessed by the **backend service** to send upload and removal requests from the aforementioned directory. The **database service** is accessed by this service at times when determining where a user's submission is located.

#### tests - Test Directory

Directory which contains unit test files and other testing tools such as mocks and mock functions for white-box testing of the service.

* `src/tests/*`
  * `AvatarRouter.test.ts` - Tests for the `AvatarRouter.ts` file.
  * `SubmissionRouter.test.ts` - Tests for the `SubmissionRouter.ts` file.

Contains various files which test the functionality of the API endpoints of the service.

#### utils - Utilities Directory

Directory which contains utilities, whether in the of 'helper' classes which are responsibility for relevant actions.

* `src/utils/*`
  * `data_validator.ts` - A class which contains methods to perform standard data validation used by most routes. This is generally used for validating the type of parameters send in HTTP POST request bodies.
  * `db_helper.ts` - A class which contains methods which require database information and interaction, this includes:
    * Creating a database connection given the environment variables of the service.
    * Retrieving database connections, called externally via function.
    * Parsing the database for a user given their email address, called externally via function.
    * Retrieving the user's role from the database given their email address, called externally via function.
    * Validating a login attempt by retrieving the user via email, checking whether the account actually exists, checking if the account is verified, checking if the account is locked out, and checking if the password is valid.
    * Updating login attempts for the user to ensure security of their account if brute-force attempts are being.
  * `auth_helper.ts` - A class which contains methods that manage requests made to the **authentication suite service**. Calls to `db_helper.ts` methods are also made to retrieve necessary user data once the access token is decoded. This includes:
    * Sending a request to validate and retrieve user emails from tokens stored in the cookies of each request.
    * Sending a request to validate and retrieve administrator usernames from tokens stored in the cookies of each request.
    * Sending a request to refresh a user's token after expiry. This is done within this service as opposed to being done in the **user frontend service** to enable ease of use when fetching dynamic file resources.
    * Sending a request to refresh an administrator's token after expiry. This is done within this service as opposed to being done in the **administrator frontend service** to enable ease of use when fetching dynamic file resources.

## Build and Run via Docker

> Note: This requires an installation of Docker on your system. [You can install Docker here.](https://www.docker.com/)

To create a Docker deployment of the entire application, run the following:

```bash
cd <project root>/app/
docker-compose up -d
```

To create a Docker deployment specifically for the authentication suite container, run the following:

```bash
cd <project root>/app/
docker-compose up -d data-store
```

To compose and re-build (re-run the Docker file) in case the image is cached:

```bash
cd <project root>/app/
docker-compose up -d data-store --build
```

> To read more about our Docker configuration, [you can visit the app-level README.md file.](../README.md)

## Install, Build and Run Locally

> Note: This requires an installation of the Node.js JavaScript runtime environment and the Node Package Manager (NPM) on your system. [You can find ways to install Node.js and NPM here.](https://nodejs.org/en/download/package-manager)

Before running any of the following commands, ensure all the dependencies for the service are installed locally:

```bash
cd <project root>/app/data_store
npm i
```

To produce a build within the local system, run the following in a terminal window:

```bash
# If outside directory:
cd <project root>/app/data_store
npm run build # npx tsc
```

To start within the local system, run the following in a terminal window:

```bash
cd <project root>/app/data_store
npm run server # node ./dist/server
```

To start with hot-reload within the local system, run the following in a terminal window:

```bash
cd <project root>/app/data_store
npm run server # nodemon ./dist/server
```

* Note: given the existing dependencies that the microservices have to each other, particularly, to the database, we do not suggest attempting to develop from a local server. The microservices will not behave as expected if not run within a shared Docker network, as is configured by the app-level `docker-compose.yaml` file.

## Running Tests

Before running any of the following commands, ensure all the dependencies for the service are installed locally:

```bash
cd <project root>/app/data_store
npm i
```

To run unit tests for this microservice, run the following in a terminal window:

```bash
# If outside directory:
cd <project root>/app/data_store
npm run test # npx jest --detectOpenHandles --forceExit --silent --coverage
```

## Linting Code (EsLint)

Before running any of the following commands, ensure all the dependencies for the service are installed locally:

```bash
cd <project root>/app/data_store
npm i
```

To perform a check where linting is deemed necessary by the configuration, run the following in a terminal window:

```bash
# If outside directory:
cd <project root>/app/data_store
npm run lint-check # eslint ./src/**
```

To run a lint operation to clean up code, run the following in a terminal window:

```bash
# If outside directory:
cd <project root>/app/data_store
npm run lint # eslint ./src/** --fix
```

## Other Notes

* This service's alias within the app-level `docker-compose.yaml` file is `data-store`. When it is deployed as part of the shared Docker network, it is given the name `app_data-store`.
* This service's routes are accessible to the frontend via the NGINX reverse-proxy along the path `/store/...`, but can otherwise be accessed from the other containers via it's container name (`app_data-store` ). Connections should be specified using 'https' exclusively.
